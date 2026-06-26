import { useState } from "react";
import { ACCENT_STYLES, PAGES } from "../../config/pages";
import PageIcon from "../shared/PageIcon";
import { Menu, Shield, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";


function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.39-1.25.71-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.77 1.07.77 2.15 0 1.55-.01 2.81-.01 3.19 0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
export default function Navigation({ activePageId, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    setMobileOpen(false);
  };

  const navLinkClass = (pageId, accent) => {
    const isActive = activePageId === pageId;
    const styles = ACCENT_STYLES[accent];

    if (isActive) {
      return `relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${styles.active}`;
    }

    return "relative flex w-full items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-white/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100";
  };

  const navItems = PAGES.map((page) => (
    <li key={page.id}>
      {page.id === "resumen" && (
        <p className="mb-1 mt-1 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          Informe 1° parte
        </p>
      )}

      {page.id === "activos" && (
        <p className="mb-1 mt-5 border-t border-slate-200/80 px-3 pt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:border-slate-700/80 dark:text-slate-500">
          Informe 2° parte
        </p>
      )}

      <button
        type="button"
        onClick={() => handleNavigate(page.id)}
        className={navLinkClass(page.id, page.accent)}
        aria-current={activePageId === page.id ? "page" : undefined}
      >
        <PageIcon pageId={page.id} className="h-4 w-4 shrink-0" />
        <span className="truncate">{page.title}</span>
      </button>
    </li>
  ));

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/90 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
            <Shield className="h-4 w-4" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            Auditoría Flonic
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 transition-transform duration-300 ease-out dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-black/30 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden border-b border-slate-200/80 px-6 py-6 dark:border-slate-700/80 lg:block">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-md shadow-violet-500/25">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </div>

            <div className="text-left">
              <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                Auditoría Flonic
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Portal de seguridad
              </p>
            </div>
          </div>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-3 py-4"
          aria-label="Secciones de la auditoría"
        >
          <ul className="space-y-0.5">{navItems}</ul>
        </nav>

        <footer className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-3.5 dark:border-slate-700/80 dark:bg-slate-800/30">
          <div className="flex items-center justify-between gap-2">
            <p className="text-left text-[11px] leading-snug text-slate-400 dark:text-slate-500">
              AFP Horizonte · Auditoría de seguridad
            </p>
            <div className="flex shrink-0 items-center gap-0.5">
              <ThemeToggle />
              <a
                href="https://github.com/nicofloresm1-cell"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Ver repositorio en GitHub"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </footer>
      </aside>
    </>
  );
}
