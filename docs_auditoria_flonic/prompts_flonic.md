# Bitácora de Uso de Inteligencia Artificial

## 1. Herramientas utilizadas

- **Cursor AI** — usado al inicio del proyecto para generar el esqueleto técnico de la aplicación (archivos de layout y navegación, componente reutilizable de renderizado, configuración centralizada de páginas), a partir del esqueleto de la aplicación que diseñé en clases (carpeta docs, img, archivos md y archivos src/components/jsx).
- **Claude (Anthropic)** — usado durante todo el desarrollo como apoyo para investigar y entender las vulnerabilidades del laboratorio, redactar el contenido técnico de los informes (Markdown), depurar errores de React/Vite, y diseñar componentes visuales (mapa de calor de la matriz de riesgo). Cada vez que recurrí a esta herramienta, le entregué el contexto real del proyecto (mi empresa asignada, el resultado de mis propios ataques en DVWA, o el código exacto de mis componentes) para que la ayuda fuera específica y no genérica.

## 2. Prompts utilizados y resultado

### 2.1 Arquitectura inicial del proyecto (Cursor AI)

**Prompt:**
> "Actúa como un desarrollador Full Stack Senior. Ayúdame a diseñar, programar y depurar mi proyecto. Antes de escribir código, analiza la arquitectura. Sugiere buenas prácticas de seguridad, rendimiento y mantenimiento. Genera código limpio y comentado. Quiero realizar una aplicación web, en docs tengo los archivos md, los cuales serán renderizados en src/components y todo se gestionará en App.jsx, cada uno de estos componentes será una página (tipo landing page). Los archivos md están vacíos, después los iré llenando, se dejará listo para que se renderice. Por último quiero usar Tailwind con diseño responsivo e iconos acorde a lo que mencione."

**Resultado generado:** una arquitectura de SPA con navegación por secciones, usando un componente reutilizable (`MarkdownLanding.jsx`) para la plantilla visual (hero + contenido), metadatos centralizados en `config/pages.js`, navegación responsiva (sidebar en desktop, menú hamburguesa en móvil), y un estado vacío ("Contenido pendiente") para los `.md` que aún no tenían contenido.

- **Qué acepté:** el esqueleto generado por Cursor a partir de ese prompt — los archivos de layout y navegación (`Navigation.jsx`), el componente reutilizable `MarkdownLanding.jsx`, y la configuración centralizada (`config/pages.js`). A partir de ese esqueleto, yo creé y completé cada uno de los archivos `.md` dentro de `docs_auditoria_flonic/`, así como los componentes `.jsx` de cada sección que importan ese contenido.
- **Qué corregí/extendí más adelante:** esta arquitectura inicial no contemplaba cómo resolver las **imágenes** referenciadas dentro de los `.md` (Vite no las resuelve solo por estar en una ruta relativa de texto), ni el soporte de **tablas Markdown** (faltaba el plugin `remark-gfm`). Ambos los fui corrigiendo en etapas posteriores del desarrollo, a medida que se presentaron.

### 2.2 Análisis de vulnerabilidades (Informe A)

**Prompt:** *"Para AFP Horizonte (rubro previsión), explica por qué funciona la inyección SQL con el payload `' OR '1'='1` en DVWA nivel Low, y calcula el vector y puntaje CVSS 3.1 completo, justificando cada métrica (AV, AC, PR, UI, S, C, I, A) según lo que esa vulnerabilidad expone en un portal de afiliados."*

- **Qué hice yo:** ejecuté el ataque en DVWA, observé el resultado (la base de datos completa expuesta) y a partir de eso construí el análisis: identifiqué que la causa era la falta de consultas parametrizadas, y usé el prompt para estructurar esa explicación de forma técnica y completa, además de generar una primera propuesta de vector CVSS basada en lo que yo mismo había observado del ataque.
- **Qué corregí/verifiqué:** entré a la calculadora oficial (first.org/cvss/calculator/3.1) e ingresé el vector propuesto para confirmar que el puntaje (9.1 para SQLi, 6.1 para XSS, 9.8 para Comandos) coincidiera con el cálculo oficial antes de darlo por definitivo en el informe.

Se repitió el mismo proceso —ejecutar el ataque primero, luego estructurar el análisis con ayuda del prompt y verificar el CVSS en la calculadora oficial— para `xss` (payload `<script>alert('XSS')</script>`, con énfasis en por qué el CVSS de XSS requiere interacción del usuario a diferencia de SQLi) y `comandos` (payload `127.0.0.1; cat /etc/passwd`, con énfasis en por qué la disponibilidad también se ve afectada al ser ejecución a nivel de sistema operativo).

### 2.3 Activos y matriz de riesgo (Informe B)

**Prompt:** *"Dado que la empresa es AFP Horizonte (administradora de fondos de pensiones), identifica los activos de información críticos de su portal de clientes (más allá de 'datos personales' genéricos) y justifica por qué el rubro previsión hace que la integridad de los datos sea tan crítica como la confidencialidad."*

- **Qué hice yo:** a partir de lo que sabía del rubro (que una AFP administra ahorros previsionales, no solo datos personales), pedí que se identificaran los activos específicos del negocio en vez de una lista genérica, y revisé que cada activo propuesto tuviera sentido real para un portal de afiliados.
- **Qué corregí:** pedí que se reemplazaran los códigos de activo (A1, A2...) por nombres en lenguaje natural en la matriz de riesgo, ya que la pauta exige que el informe sea comprensible para una persona no técnica.

**Prompt:** *"Arma una matriz de riesgo (probabilidad × impacto, escala 1-25) para los 3 hallazgos técnicos del laboratorio más 3 riesgos de contexto de negocio propios de una AFP, y enséñame cómo representar el mapa de calor como componente visual en React (no solo como tabla de texto)."*

- **Qué hice yo:** definí que la matriz debía combinar los 3 hallazgos técnicos reales del laboratorio con riesgos de negocio propios del rubro previsión, y decidí que el mapa de calor debía ser un componente visual real (no una tabla de texto), ya que así lo exige la pauta.
- **Qué corregí:** ajusté la posición del mapa de calor dentro de la página (quedó al final por defecto; pedí que apareciera como sección 3, justo después de la identificación de riesgos), y revisé que los colores y la ubicación de cada riesgo en la grilla calzaran con los valores reales de probabilidad e impacto que yo había definido.

### 2.4 Resolución de errores técnicos

Durante la integración del sitio, cada vez que encontraba un error le enviaba a Claude el mensaje exacto (de consola o de captura) junto con el código real del componente afectado, para entender la causa antes de aplicar cualquier cambio:

- **Imágenes no se renderizaban:** noté que las imágenes no aparecían en `localhost` aunque el `.md` las referenciaba bien. Envié el componente `.jsx` y el comportamiento que observaba, y se identificó que el `.md` se carga como texto plano (`?raw` de Vite), por lo que las rutas relativas de las imágenes no se resuelven solas. Implementé la solución: importar cada imagen directamente en el componente `.jsx` y reemplazar la ruta del Markdown por la URL ya procesada por Vite (`content.replace(...)`).
- **Tablas Markdown se veían como texto con `|` literales:** envié una captura de cómo se veía la matriz de riesgo mal renderizada, y se identificó que faltaba el plugin `remark-gfm` en `react-markdown`. Lo agregué como `remarkPlugins={[remarkGfm]}`.
- **Sidebar se comportaba distinto a lo esperado:** describí el comportamiento que quería (que el menú se mantuviera visible al hacer scroll en páginas largas) y ajusté `position: static` a `sticky`, agregando además un `useEffect` con `window.scrollTo` para que cada cambio de sección reinicie el scroll al inicio.
- **Ícono de GitHub rompía la build:** al agregar el botón de GitHub al sidebar, la consola arrojó un error de import. Envié el mensaje de error exacto y se identificó que `lucide-react` no incluye logos de marca; lo reemplacé por un SVG embebido directamente en el componente.

En todos los casos, mandé el error real (consola o captura) y el código afectado antes de aplicar cualquier corrección, y verifiqué cada cambio corriendo `npm run dev` localmente antes de subirlo.

## 3. Reflexión final

La arquitectura inicial del sitio la diseñé yo en clases, definiendo de antemano la separación entre contenido (Markdown) y presentación (React); ese diseño lo planteé como un prompt detallado a Cursor AI, que generó el esqueleto técnico (layout, navegación, componente reutilizable de renderizado). A partir de ahí, yo creé y completé cada archivo `.md` y cada componente de sección. Ese enfoque facilitó mucho el desarrollo incremental: pude ir llenando cada `.md` por separado sin tocar la lógica de los componentes. Sin embargo, esa arquitectura inicial no anticipó problemas reales que solo aparecieron al integrar contenido real (imágenes, tablas) — ahí fue donde recurrí a Claude para depurar y entender la causa exacta de cada error, enviando siempre el código y el comportamiento real que observaba, en vez de pedir soluciones genéricas. La parte de seguridad en sí (ejecutar los ataques en DVWA, verificar los puntajes CVSS en la calculadora oficial, definir los activos y riesgos según el rubro previsión) siguió siendo un trabajo de análisis propio, donde la IA ayudó a estructurar y a explicar, pero no reemplazó la verificación técnica.