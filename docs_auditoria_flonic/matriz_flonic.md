# Matriz de Riesgo — AFP Horizonte

## 1. Metodología

La matriz de riesgo cruza dos dimensiones:

- **Probabilidad** (1 = Muy baja, 5 = Muy alta): qué tan factible es que la amenaza se materialice.
- **Impacto** (1 = Muy bajo, 5 = Muy alto): qué tan grave sería el daño para AFP Horizonte y sus afiliados.

**Riesgo = Probabilidad × Impacto** (escala resultante 1–25), clasificado en:

| Rango | Nivel de riesgo | Color sugerido |
|-------|------------------|-----------------|
| 1–4 | Bajo | Verde |
| 5–9 | Medio | Amarillo |
| 10–15 | Alto | Naranja |
| 16–25 | Crítico | Rojo |


## 2. Identificación de riesgos

| ID | Amenaza / Vulnerabilidad | Activos afectados | Probabilidad | Impacto | Riesgo (P×I) | Nivel |
|----|---------------------------|---------------------|:---:|:---:|:---:|-------|
| R1 | Inyección SQL en formulario de consulta | Base de datos de afiliados, historial de cotizaciones, saldo de cuenta individual, credenciales de acceso | 5 | 5 | 25 | Crítico |
| R2 | XSS Reflejado en campo de búsqueda/consulta | Credenciales de acceso al portal, reputación institucional | 4 | 3 | 12 | Alto |
| R3 | Inyección de comandos en módulo de diagnóstico/ping | Servidor de aplicación y base de datos (y por extensión todos los activos alojados en él) | 3 | 5 | 15 | Alto |
| R4 | Filtración de credenciales por contraseñas débiles/sin hash robusto | Credenciales de acceso al portal | 3 | 4 | 12 | Alto |
| R5 | Indisponibilidad del portal (DoS) en períodos de alta demanda (ej. declaración de renta) | Portal web de clientes | 2 | 4 | 8 | Medio |
| R6 | Alteración no detectada de historial de cotizaciones | Historial de cotizaciones, saldo de cuenta individual | 2 | 5 | 10 | Alto |


## 4. Priorización

1. **R1 — Inyección SQL (Crítico):** prioridad máxima. Compromete de inmediato la confidencialidad e integridad de toda la base de afiliados.
2. **R3 — Inyección de comandos (Alto):** segunda prioridad. Su impacto es total al comprometer el servidor completo.
3. **R2, R4, R6 (Alto):** requieren remediación en el corto plazo.
4. **R5 (Medio):** se gestiona con medidas de continuidad operativa, ver `recuperacion`.


## 5. Próximos pasos

Las medidas para reducir cada riesgo se detallan en `controles`, y el plan de continuidad ante un incidente materializado se detalla en `recuperacion`.