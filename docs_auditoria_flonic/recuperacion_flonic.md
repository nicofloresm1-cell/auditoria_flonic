# Mejora Tecnológica y Plan de Recuperación ante Desastres

## 1. Mejora tecnológica propuesta

A partir de los hallazgos de esta auditoría, se propone una mejora tecnológica integral para AFP Horizonte:

**Migración a una arquitectura de aplicación segura por diseño**, que incluya:

- **Capa de acceso a datos con ORM/prepared statements** obligatorios, eliminando por completo la posibilidad de construir consultas SQL por concatenación de strings.
- **API Gateway con WAF integrado** delante del portal de clientes, centralizando la detección de patrones de SQLi, XSS e inyección de comandos antes de que la solicitud llegue a la aplicación.
- **Contenerización de la aplicación** (ej. Docker) con políticas de mínimo privilegio a nivel de sistema operativo, de forma que un compromiso de la aplicación no otorgue acceso directo al sistema de archivos completo del host.
- **Gestión centralizada de logs y SIEM**, para correlacionar eventos sospechosos (consultas anómalas, intentos de inyección, accesos a archivos del sistema) y generar alertas en tiempo real.

Esta mejora ataca directamente las causas raíz de los tres hallazgos del laboratorio (R1, R2, R3), en vez de solo parchear síntomas puntuales.

## 2. Plan de recuperación ante desastres (DR)

### 2.1 Objetivos de recuperación

| Métrica | Valor objetivo | Justificación |
|---------|------------------|----------------|
| **RTO** (Recovery Time Objective) — tiempo máximo de inactividad aceptable | 4 horas | El portal es el canal principal de autoservicio; una caída prolongada afecta a miles de afiliados y genera carga adicional en atención telefónica |
| **RPO** (Recovery Point Objective) — pérdida máxima de datos aceptable | 15 minutos | Dado que se procesan cotizaciones y movimientos de cuentas individuales, la pérdida de datos debe ser mínima para no afectar el patrimonio previsional de los afiliados |

### 2.2 Estrategia de respaldo

- **Respaldos automáticos de la base de datos** cada 15 minutos (incrementales) y respaldo completo diario, almacenados en una ubicación geográficamente separada del servidor principal.
- **Replicación en tiempo real** a un servidor secundario (failover), de forma que ante la caída del servidor principal, el sistema pueda conmutar automáticamente.
- **Pruebas de restauración periódicas** (al menos trimestrales), para verificar que los respaldos efectivamente puedan recuperarse y no solo que se generaron.

### 2.3 Plan de respuesta ante un incidente de seguridad (no solo caída del servicio)

1. **Detección:** identificación del incidente mediante alertas del WAF/SIEM o reporte de un afiliado/empleado.
2. **Contención:** aislar el sistema afectado (ej. desconectar de la red, revocar credenciales comprometidas) para detener la propagación del ataque.
3. **Erradicación:** eliminar la causa raíz (parchear la vulnerabilidad explotada, remover código malicioso si se instaló alguno).
4. **Recuperación:** restaurar el servicio desde un respaldo limpio y verificado, confirmando la integridad de los datos antes de volver a producción.
5. **Lecciones aprendidas:** documentar el incidente, actualizar las políticas de prevención (`controles`) y comunicar internamente los aprendizajes.

### 2.4 Comunicación ante el incidente

- Notificación interna inmediata al equipo de TI y a la gerencia.
- Si el incidente involucra datos personales de afiliados, evaluación de la obligación de notificar a la Superintendencia de Pensiones y a los afiliados afectados, conforme a la normativa vigente de protección de datos.
- Canal de comunicación transparente hacia los afiliados (ej. aviso en el portal) si el servicio se ve interrumpido, evitando generar mayor desconfianza por falta de información.

## 3. Relación con los riesgos identificados

Este plan da respuesta directa a los riesgos **R5** (indisponibilidad del portal) y **R6** (alteración no detectada del historial de cotizaciones) de la matriz de riesgo, y complementa los controles de mitigación de **R1**, **R2** y **R3** al asegurar que, incluso si un ataque tiene éxito, AFP Horizonte pueda recuperarse rápidamente y sin pérdida significativa de datos.