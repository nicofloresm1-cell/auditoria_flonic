# Auditoría de Seguridad — AFP Horizonte

Aplicación web que presenta una auditoría de seguridad sobre el portal de clientes de **AFP Horizonte** (empresa ficticia, rubro previsión), desarrollada para la asignatura **TI3034 — Fundamentos de Seguridad de la Información**.

El laboratorio se realizó en un ambiente controlado y autorizado (**DVWA — Damn Vulnerable Web Application**), demostrando tres vectores de ataque, su severidad (CVSS v3.1) y proponiendo medidas de prevención, mitigación y recuperación.

## 🔗 Sitio en vivo

[https://auditoria-flonic.vercel.app](https://auditoria-flonic.vercel.app)

## 🛠️ Stack técnico

- React + Vite
- Tailwind CSS
- Despliegue en Vercel

## 📂 Estructura del proyecto
auditoria_flonic/

├── docs_auditoria_flonic/      # Contenido del informe (Markdown)

│   ├── img_flonic/              # Capturas de los ataques

│   ├── resumen_flonic.md

│   ├── sqli_flonic.md

│   ├── xss_flonic.md

│   ├── comandos_flonic.md

│   ├── activos_flonic.md

│   ├── matriz_flonic.md

│   ├── controles_flonic.md

│   ├── recuperacion_flonic.md

│   └── prompts_flonic.md

├── src/

│   ├── components/               # Componentes React por sección

│   └── config/                   # Configuración de páginas y navegación

└── ...

## 🚀 Cómo correr el proyecto localmente

```bash
npm install
npm run dev
```

## 📋 Secciones de la auditoría

1. **Resumen Ejecutivo** — Empresa auditada y alcance
2. **Inyección SQL** — Evidencia, análisis técnico, CVSS y defensa
3. **Cross-Site Scripting (XSS)** — Evidencia, análisis técnico, CVSS y defensa
4. **Inyección de Comandos** — Evidencia, análisis técnico, CVSS y defensa
5. **Activos** — Inventario de activos críticos del portal
6. **Matriz de Riesgo** — Priorización de hallazgos (probabilidad × impacto)
7. **Controles** — Políticas de prevención y mitigación
8. **Recuperación** — Plan de continuidad ante incidentes
9. **Prompts** — Bitácora de uso de IA durante el desarrollo

## ⚠️ Marco ético-legal

Todas las pruebas de penetración se realizaron exclusivamente sobre el entorno DVWA autorizado para esta actividad académica. Atacar sistemas ajenos sin autorización constituye delito según la Ley N.° 21.459 (Chile). Las técnicas aquí documentadas se presentan con fines defensivos y educativos.

---

**Asignatura:** TI3034 — Fundamentos de Seguridad de la Información
