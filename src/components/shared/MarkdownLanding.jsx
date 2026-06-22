import ReactMarkdown from "react-markdown";
import { ACCENT_STYLES } from "../../config/pages";
import PageIcon from "./PageIcon";
import remarkGfm from "remark-gfm";

export default function MarkdownLanding({ pageId, title, subtitle, accent, content }) {
  const styles = ACCENT_STYLES[accent] ?? ACCENT_STYLES.violet;
  const trimmed = content?.trim() ?? "";
  const isEmpty = trimmed.length === 0;

  return (
    <article className="min-h-full">
      <header
        className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br ${styles.hero} px-6 py-8 shadow-md sm:px-10 sm:py-12 dark:border-slate-700/80`}
      >
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm ${styles.icon}`}>
            <PageIcon pageId={pageId} className="h-8 w-8" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-10 dark:border-slate-700 dark:bg-slate-800/90">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${styles.icon}`}>
              <PageIcon pageId={pageId} className="h-8 w-8 opacity-60" />
            </div>
            <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
              Contenido pendiente
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Edita el archivo Markdown en{" "}
              <code className="rounded-md bg-slate-100 px-2 py-1 text-xs font-mono dark:bg-slate-700">
                docs_auditoria_flonic/
              </code>
            </p>
          </div>
        ) : (
          <div className="md-content prose prose-slate max-w-none text-left dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{trimmed}</ReactMarkdown>

          </div>
        )}
      </section>
    </article>
  );
}
