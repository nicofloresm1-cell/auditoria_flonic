import ReactMarkdown from "react-markdown";
import { ACCENT_STYLES } from "../../config/pages";
import PageIcon from "./PageIcon";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  table: ({ children }) => (
    <div className="mb-5">
      <p className="mb-2 text-xs font-medium text-slate-400 dark:text-slate-500 sm:hidden">
        ← Desliza para ver la tabla completa →
      </p>
      <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-[0_4px_20px_-8px_rgb(15_23_42/0.12)] transition-shadow duration-300 hover:shadow-[0_8px_28px_-10px_rgb(15_23_42/0.16)] dark:border-slate-700/80 dark:shadow-black/20">
        <table className="w-full min-w-[640px]">{children}</table>
      </div>
    </div>
  ),
};

export default function MarkdownLanding({ pageId, title, subtitle, accent, content }) {
  const styles = ACCENT_STYLES[accent] ?? ACCENT_STYLES.violet;
  const trimmed = content?.trim() ?? "";
  const isEmpty = trimmed.length === 0;

  return (
    <article className="min-h-full">
      <header
        className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br ${styles.hero} px-5 py-6 shadow-[0_8px_32px_-12px_rgb(15_23_42/0.12)] transition-shadow duration-500 hover:shadow-[0_16px_48px_-16px_rgb(15_23_42/0.18)] sm:px-10 sm:py-11 dark:border-slate-700/60 dark:shadow-[0_8px_32px_-12px_rgb(0_0_0/0.4)] dark:hover:shadow-[0_16px_48px_-16px_rgb(0_0_0/0.55)]`}
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-[0.35] dark:opacity-20" aria-hidden="true" />
        <div className="hero-shimmer-line pointer-events-none absolute inset-x-0 top-0 h-px opacity-70" aria-hidden="true" />
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl animate-orb-drift ${styles.glow}`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full blur-3xl opacity-60 animate-orb-drift-reverse ${styles.glow}`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className={`animate-fade-in-up flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg ring-4 ring-white/40 transition-transform duration-500 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem] dark:ring-slate-800/40 ${styles.icon}`}>
            <PageIcon pageId={pageId} className="h-7 w-7 animate-float sm:h-8 sm:w-8" />
          </div>
          <div className="animate-fade-in-up delay-100 min-w-0 text-left">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500/90 sm:text-[11px] sm:tracking-[0.18em] dark:text-slate-400">
              Sección de auditoría
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl sm:leading-tight md:text-[2.25rem]">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:mt-2.5 sm:text-base dark:text-slate-300">
              {subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="glass-panel animate-fade-in-up delay-200 mt-5 rounded-2xl p-4 sm:mt-8 sm:p-6 md:p-10">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`mb-5 flex h-16 w-16 animate-float items-center justify-center rounded-2xl shadow-md ring-4 ring-slate-100/80 dark:ring-slate-800/60 ${styles.icon}`}>
              <PageIcon pageId={pageId} className="h-8 w-8 opacity-60" />
            </div>
            <p className="text-xl font-semibold tracking-tight text-slate-600 dark:text-slate-300">
              Contenido pendiente
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Edita el archivo Markdown en{" "}
              <code className="rounded-md border border-slate-200/80 bg-slate-100 px-2 py-1 text-xs font-mono dark:border-slate-600/80 dark:bg-slate-800">
                docs_auditoria_flonic/
              </code>
            </p>
          </div>
        ) : (
          <div className="md-content prose prose-slate max-w-none text-left dark:prose-invert prose-headings:scroll-mt-20">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{trimmed}</ReactMarkdown>

          </div>
        )}
      </section>
    </article>
  );
}
