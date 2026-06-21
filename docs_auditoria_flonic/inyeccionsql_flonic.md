# Inyección SQL — Vulnerabilidad: SQL Injection

## 1. Evidencia del ataque

**Entorno:** DVWA, nivel de seguridad **Low**, módulo *SQL Injection*.

**Payload utilizado:**

```sql
' OR '1'='1
```

**Resultado:** en vez de devolver la información de un único usuario (según el "User ID" ingresado), la aplicación devolvió **el listado completo de la tabla de usuarios**: admin, Gordon Brown, Hack Me, Pablo Picasso y Bob Smith, incluyendo nombre y apellido de cada uno.

![Inyección SQL - resultado](img_flonic/sqli_flonic.png)

## 2. Por qué funciona la vulnerabilidad

El formulario construye la consulta SQL concatenando directamente el valor ingresado por el usuario, sin validarlo ni separarlo del código SQL. La consulta en el servidor es similar a:

```sql
SELECT first_name, last_name FROM users WHERE user_id = '$id';
```

Al ingresar `' OR '1'='1`, la consulta resultante queda:

```sql
SELECT first_name, last_name FROM users WHERE user_id = '' OR '1'='1';
```

La condición `'1'='1'` es **siempre verdadera**, por lo que la cláusula `WHERE` deja de filtrar por un usuario específico y la consulta devuelve **todas las filas** de la tabla `users`. Esto se conoce como **inyección SQL clásica (in-band)**: el atacante manipula directamente la lógica de la consulta porque la aplicación no usa **consultas parametrizadas** ni sanitiza la entrada.

En un escenario real contra el portal de AFP Horizonte, esta misma técnica podría usarse para extraer RUT, saldos de cuenta individual, historial de cotizaciones, o incluso para modificar/eliminar registros, según los permisos de la cuenta de base de datos usada por la aplicación.

## 3. Puntaje y severidad CVSS

Cálculo realizado con la calculadora oficial: https://www.first.org/cvss/calculator/3.1

**Vector CVSS 3.1:** `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`
**Puntaje base:** **9.1 / 10 — Severidad Crítica**

### Justificación de cada métrica

**Vector de ataque (AV) = Red (N)**
El ataque se ejecuta enviando una solicitud HTTP normal a través de internet/red — no se necesita estar físicamente en el servidor ni en la misma red local. Por eso es "Red", el nivel más explotable.

**Complejidad de ataque (AC) = Bajo (L)**
El payload: una sola cadena de texto (`' OR '1'='1`) sin necesidad de condiciones especiales, sin tener que esperar timing exacto ni vencer protecciones adicionales. Cualquier persona puede reproducirlo copiando y pegando.

**Privilegios requeridos (PR) = Ninguno (N)**
No se necesita estar autenticado como admin ni tener ninguna cuenta especial — el formulario de "User ID" es de acceso libre dentro de la app (no hay control de acceso adicional).

**Interacción de usuario (UI) = Ninguno (N)**
No depende de que otra persona haga clic en algo o abra un enlace. El propio atacante envía el payload directamente y obtiene el resultado de inmediato — a diferencia del XSS, donde se necesita que la víctima visite una página.

**Alcance (S) = Sin cambios (U)**
El impacto queda contenido dentro del mismo componente vulnerable (la aplicación/base de datos), sin "saltar" a otro sistema con un nivel de privilegios distinto.

**Confidencialidad (C) = Alto (H)**
Quedó demostrado: el ataque expuso toda la tabla de usuarios (admin, Gordon Brown, Hack Me, Pablo Picasso, Bob Smith), no solo un registro. Acceso total a datos que deberían estar protegidos = impacto alto.

**Integridad (I) = Alto (H)**
Aunque el payload específico solo leyó datos, la misma técnica de inyección (sin consultas parametrizadas) permite construir otros payloads que modifiquen o borren registros (`UPDATE`, `DELETE`) si la cuenta de base de datos tiene esos permisos — por eso se califica el potencial máximo de la vulnerabilidad, no solo lo que se probó puntualmente.

**Disponibilidad (A) = Ninguno (N)**
El ataque no detuvo el servicio ni afectó que otros usuarios sigan usando la aplicación normalmente — no hubo impacto en disponibilidad.

## 4. Política de prevención (3.1.4)

- **Uso obligatorio de consultas parametrizadas / prepared statements** en todo acceso a base de datos, prohibiendo la concatenación directa de entradas del usuario en sentencias SQL.
- **Principio de mínimo privilegio** en la cuenta de base de datos que usa la aplicación web (sin permisos de DROP/ALTER, y limitando UPDATE/DELETE a lo estrictamente necesario).
- **Revisión de código (code review) obligatoria** antes de desplegar cambios que toquen consultas a la base de datos de afiliados.

## 5. Control de mitigación (3.1.5)

- **Web Application Firewall (WAF)** con reglas específicas de detección de patrones de inyección SQL (ej. `OR 1=1`, comillas no escapadas).
- **Validación y sanitización de entradas** en el backend (whitelisting de formato esperado, ej. solo números para un campo de ID).
- **Monitoreo y alertas** sobre consultas anómalas a la base de datos (ej. consultas que devuelven un volumen de filas anormalmente alto para el contexto).
- **Cifrado de datos sensibles en reposo** (RUT, saldos, historial de cotizaciones), para que incluso si la inyección ocurre, el daño esté acotado.