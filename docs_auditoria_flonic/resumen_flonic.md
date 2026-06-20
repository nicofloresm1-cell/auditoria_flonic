# Resumen Ejecutivo — Auditoría de Seguridad

## Empresa auditada

**AFP Horizonte** es una Administradora de Fondos de Pensiones (AFP) ficticia, perteneciente al rubro de **previsión social**. Su función principal es administrar los fondos de ahorro previsional obligatorio de sus afiliados, gestionar las cotizaciones mensuales, pagar pensiones (vejez, invalidez, sobrevivencia) y entregar información financiera y previsional a través de su **portal de clientes**.

## El portal de clientes

El portal web de AFP Horizonte permite a los afiliados:

- Consultar el saldo y rentabilidad de su cuenta de capitalización individual.
- Revisar el historial de cotizaciones y aportes del empleador.
- Simular proyecciones de pensión.
- Actualizar datos personales y de contacto.
- Solicitar certificados (saldo, cotizaciones, afiliación) para trámites.

Dado que estas funciones requieren autenticación y manejo de datos personales sensibles (RUT, sueldo imponible, historial laboral, saldo de ahorro), el portal constituye un activo crítico para la empresa y un objetivo de alto valor para un atacante.

## Alcance de la auditoría

Esta auditoría evalúa el portal de clientes en un ambiente controlado (DVWA, configurado en nivel de seguridad **Low**), simulando tres vectores de ataque comunes en aplicaciones web:

1. **Inyección SQL** — acceso no autorizado a la base de datos de afiliados.
2. **Cross-Site Scripting (XSS) Reflejado** — ejecución de código en el navegador de la víctima.
3. **Inyección de comandos** — toma de control del servidor que aloja el portal.

Para cada ataque se documenta evidencia técnica, severidad (CVSS v3.1), y medidas de prevención y mitigación. Posteriormente se construye una matriz de riesgo que prioriza estos hallazgos según el contexto de negocio de una AFP, considerando el marco regulatorio de la Superintendencia de Pensiones y la Ley N.° 21.459 sobre delitos informáticos.

## Por qué importa para una AFP

A diferencia de otros rubros, una brecha de seguridad en una AFP no solo implica pérdida de datos personales: puede afectar el **patrimonio previsional** de miles de afiliados, generar **sanciones regulatorias**, y dañar gravemente la **confianza pública** en una institución que administra ahorros obligatorios de toda la vida laboral de una persona.