
export const PAGES = [
  {
    id: "resumen",
    title: "Resumen Ejecutivo",
    subtitle: "Visión general y alcance de la auditoría de seguridad",
    accent: "violet",
  },
  {
    id: "activos",
    title: "Activos",
    subtitle: "Inventario de activos críticos del portal auditado",
    accent: "blue",
  },
  {
    id: "controles",
    title: "Controles",
    subtitle: "Controles de seguridad evaluados y su efectividad",
    accent: "emerald",
  },
  {
    id: "inyeccionsql",
    title: "Inyección SQL",
    subtitle: "Vulnerabilidades de acceso no autorizado a la base de datos",
    accent: "rose",
  },
  {
    id: "xss",
    title: "Cross-Site Scripting",
    subtitle: "Ejecución de código malicioso en el navegador de la víctima",
    accent: "amber",
  },
  {
    id: "comandos",
    title: "Inyección de Comandos",
    subtitle: "Toma de control del servidor mediante comandos del sistema",
    accent: "orange",
  },
  {
    id: "matriz",
    title: "Matriz de Riesgo",
    subtitle: "Priorización de hallazgos según impacto y probabilidad",
    accent: "indigo",
  },
  {
    id: "recuperacion",
    title: "Recuperación",
    subtitle: "Plan de respuesta y remediación ante incidentes",
    accent: "cyan",
  },
  {
    id: "prompts",
    title: "Prompts",
    subtitle: "Plantillas de consulta y documentación asistida por IA",
    accent: "fuchsia",
  },
];

export const PAGE_META = Object.fromEntries(PAGES.map((page) => [page.id, page]));

export const ACCENT_STYLES = {
  violet: {
    hero: "from-violet-600/20 via-violet-500/10 to-transparent",
    icon: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    ring: "ring-violet-500/20",
    active: "bg-violet-600 text-white dark:bg-violet-500",
  },
  blue: {
    hero: "from-blue-600/20 via-blue-500/10 to-transparent",
    icon: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    ring: "ring-blue-500/20",
    active: "bg-blue-600 text-white dark:bg-blue-500",
  },
  emerald: {
    hero: "from-emerald-600/20 via-emerald-500/10 to-transparent",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    ring: "ring-emerald-500/20",
    active: "bg-emerald-600 text-white dark:bg-emerald-500",
  },
  rose: {
    hero: "from-rose-600/20 via-rose-500/10 to-transparent",
    icon: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    ring: "ring-rose-500/20",
    active: "bg-rose-600 text-white dark:bg-rose-500",
  },
  amber: {
    hero: "from-amber-600/20 via-amber-500/10 to-transparent",
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    ring: "ring-amber-500/20",
    active: "bg-amber-600 text-white dark:bg-amber-500",
  },
  orange: {
    hero: "from-orange-600/20 via-orange-500/10 to-transparent",
    icon: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
    ring: "ring-orange-500/20",
    active: "bg-orange-600 text-white dark:bg-orange-500",
  },
  indigo: {
    hero: "from-indigo-600/20 via-indigo-500/10 to-transparent",
    icon: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    ring: "ring-indigo-500/20",
    active: "bg-indigo-600 text-white dark:bg-indigo-500",
  },
  cyan: {
    hero: "from-cyan-600/20 via-cyan-500/10 to-transparent",
    icon: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
    ring: "ring-cyan-500/20",
    active: "bg-cyan-600 text-white dark:bg-cyan-500",
  },
  fuchsia: {
    hero: "from-fuchsia-600/20 via-fuchsia-500/10 to-transparent",
    icon: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
    ring: "ring-fuchsia-500/20",
    active: "bg-fuchsia-600 text-white dark:bg-fuchsia-500",
  },
};
