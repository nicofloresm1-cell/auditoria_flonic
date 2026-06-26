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
      <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm dark:border-slate-700/80">
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
        className={`relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br ${styles.hero} px-6 py-8 shadow-sm sm:px-10 sm:py-11 dark:border-slate-700/60`}
      >
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${styles.glow}`}
          aria-hidden="true"
        />
        <div
          className={`pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full blur-3xl ${styles.glow} opacity-60`}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <div className={`flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-2xl shadow-md ${styles.icon}`}>
            <PageIcon pageId={pageId} className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-[2.25rem] sm:leading-tight">
              {title}
            </h1>
            <p className="mt-2.5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:mt-8 sm:p-10 dark:border-slate-700/80 dark:bg-slate-900/60 dark:shadow-none">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${styles.icon}`}>
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
