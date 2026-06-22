# Políticas de Prevención y Controles de Mitigación

## 1. Marco general

Este documento consolida las políticas de **prevención** (medidas que reducen la probabilidad de que un riesgo se materialice) y los controles de **mitigación** (medidas que reducen el impacto si el riesgo ya se materializó), organizados según los hallazgos de la matriz de riesgo (`matriz_md`).

## 2. Políticas de prevención

### 2.1 Desarrollo seguro de software
- **Consultas parametrizadas obligatorias** en todo acceso a base de datos (previene R1 — Inyección SQL).
- **Escapado de salida (output encoding)** en todo dato proveniente del usuario antes de mostrarse en el HTML (previene R2 — XSS).
- **Prohibición de invocar la shell del sistema operativo** desde el código de aplicación; uso exclusivo de APIs nativas para tareas como ping o consultas de red (previene R3 — Inyección de comandos).
- **Revisión de código (code review) obligatoria** para todo cambio que afecte consultas a la base de datos de afiliados o ejecución de comandos del sistema.

### 2.2 Gestión de identidad y accesos
- **Política de contraseñas robustas** y almacenamiento con hash seguro (bcrypt/Argon2), nunca en texto plano (previene R4).
- **Autenticación multifactor (MFA)** para accesos administrativos al portal y a la base de datos.
- **Principio de mínimo privilegio** en las cuentas de servicio (base de datos, sistema operativo del servidor).

### 2.3 Gobernanza y cumplimiento
- **Capacitación periódica** a desarrolladores en prácticas de seguridad (OWASP Top 10).
- **Auditorías de seguridad recurrentes** (como esta), no solo una vez al año.
- **Cumplimiento normativo** con la Superintendencia de Pensiones y la Ley 19.628 de protección de datos personales.

## 3. Controles de mitigación

### 3.1 Controles técnicos
- **Web Application Firewall (WAF)** con reglas para SQLi, XSS e inyección de comandos (mitiga R1, R2, R3).
- **Cookies de sesión con flags `HttpOnly` y `Secure`** (mitiga el robo de sesión vía R2).
- **Cifrado de datos sensibles en reposo y en tránsito** (TLS, cifrado de base de datos), acotando el daño de una eventual filtración (mitiga R1, R6).
- **Segmentación de red**, separando el servidor web, la base de datos y los sistemas internos (mitiga R3 — limita movimiento lateral).

### 3.2 Controles de monitoreo y detección
- **Sistema de detección de intrusiones (IDS/IPS)** para identificar patrones de ataque en tiempo real.
- **Monitoreo de integridad de archivos (FIM)** en los servidores que alojan el portal.
- **Alertas automáticas** ante consultas anómalas a la base de datos o accesos a archivos críticos del sistema.

### 3.3 Controles organizacionales
- **Plan de respuesta a incidentes** documentado y probado periódicamente (ver `08_recuperacion_flonic.md`).
- **Equipo de respuesta a incidentes (CSIRT)** o punto de contacto definido para escalar hallazgos de seguridad.

## 4. Matriz de controles vs. riesgos

| Riesgo | Control de prevención | Control de mitigación |
|--------|------------------------|--------------------------|
| R1 — Inyección SQL | Consultas parametrizadas, code review | WAF, cifrado en reposo, monitoreo de consultas anómalas |
| R2 — XSS Reflejado | Output encoding, CSP | Cookies HttpOnly/Secure, WAF |
| R3 — Inyección de comandos | Prohibición de shell directa, validación estricta de input | Segmentación de red, FIM, sandboxing |
| R4 — Credenciales débiles | Política de contraseñas, hash seguro | MFA, monitoreo de intentos fallidos |
| R5 — Indisponibilidad del portal | Pruebas de carga periódicas | Balanceo de carga, plan de continuidad |
| R6 — Alteración de cotizaciones | Code review, controles de integridad en BD | Logs de auditoría, respaldo y reconciliación periódica |