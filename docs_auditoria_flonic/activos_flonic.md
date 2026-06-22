# Activos de Información — AFP Horizonte

## 1. Identificación de activos

| ID | Activo | Tipo | Descripción |
|----|--------|------|-------------|
| A1 | Base de datos de afiliados | Información | RUT, nombre, fecha de nacimiento, dirección, datos de contacto de todos los afiliados |
| A2 | Historial de cotizaciones | Información | Registro mensual de aportes previsionales, sueldo imponible, empleador asociado |
| A3 | Saldo de cuenta de capitalización individual | Información | Monto acumulado y rentabilidad histórica de cada afiliado |
| A4 | Credenciales de acceso al portal | Información | Usuarios, contraseñas (hash), tokens de sesión |
| A5 | Portal web de clientes | Servicio/Aplicación | Aplicación que expone consultas y trámites a los afiliados |
| A6 | Servidor de aplicación y base de datos | Infraestructura | Hardware/software que aloja el portal y la base de datos |
| A7 | Certificados digitales emitidos | Información | Certificados de saldo, cotizaciones y afiliación, usados en trámites legales (créditos, finiquitos, AFC) |
| A8 | Reputación institucional | Intangible | Confianza pública en la administración de fondos previsionales |


## 2. Criterios de valoración (Confidencialidad, Integridad, Disponibilidad)

Para cada activo se evalúa su nivel de **Confidencialidad, Integridad y Disponibilidad** (Baja/Media/Alta), según el impacto que tendría su compromiso para AFP Horizonte y sus afiliados.

| Activo | Confidencialidad | Integridad | Disponibilidad | Justificación |
|--------|------------------|------------|-----------------|----------------|
| Base de datos de afiliados | Alta | Alta | Media | Datos personales sensibles bajo la Ley 19.628; su alteración o filtración afecta a toda la base de afiliados |
| Historial de cotizaciones | Alta | Alta | Media | Si se altera, puede cambiar el cálculo de la pensión futura: impacto patrimonial directo |
| Saldo de cuenta individual | Alta | Alta | Alta | Es el ahorro de toda la vida laboral del afiliado; cualquier alteración es crítica |
| Credenciales de acceso | Alta | Alta | Media | Su compromiso permite suplantación y acceso no autorizado a cuentas |
| Portal web de clientes | Media | Alta | Alta | Canal único de autoservicio; su caída afecta a miles de usuarios simultáneamente |
| Servidor de aplicación y base de datos | Alta | Alta | Alta | Su control total implica control total de todos los demás activos |
| Certificados digitales emitidos | Alta | Alta | Media | Usados en trámites legales y financieros externos (bancos, AFC, tribunales) |
| Reputación institucional | — | — | — | Activo intangible, pero con alto impacto financiero y regulatorio si se daña |

## 3. Por qué estos activos son críticos en el rubro Previsión

A diferencia de un e-commerce, donde el peor escenario suele ser la pérdida de datos de tarjetas o transacciones puntuales, en una AFP:

- La **integridad** de los datos de cotizaciones y saldos es tan crítica como la confidencialidad: un atacante que *modifique* en vez de solo *robar* datos puede alterar silenciosamente el monto de la futura pensión de miles de personas, y el daño puede no detectarse durante años.
- La **disponibilidad** del portal tiene un componente regulatorio: la Superintendencia de Pensiones exige a las AFP mantener canales de atención y consulta operativos para sus afiliados.
- El **marco legal** (Ley 21.459 sobre delitos informáticos, Ley 19.628 sobre protección de datos, normativa de la Superintendencia de Pensiones) impone obligaciones específicas de resguardo que no existen, o son menos estrictas, en otros rubros.

## 4. Relación con los ataques del laboratorio

| Ataque del laboratorio | Activo(s) afectado(s) |
|--------------------------|------------------------|
| Inyección SQL | Base de datos de afiliados, historial de cotizaciones, saldo de cuenta individual, credenciales de acceso |
| XSS Reflejado | Credenciales de acceso al portal, reputación institucional |
| Inyección de comandos | Servidor de aplicación y base de datos, y por extensión todos los demás activos alojados en él |