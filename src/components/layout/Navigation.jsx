import { useState, useEffect } from "react";
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    setMobileOpen(false);
  };

  const navLinkClass = (pageId, accent) => {
    const isActive = activePageId === pageId;
    const styles = ACCENT_STYLES[accent];

    if (isActive) {
      return `group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 ${styles.active}`;
    }

    return "group relative flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:translate-x-0.5 hover:border-slate-200/80 hover:bg-white/90 hover:text-slate-900 hover:shadow-sm dark:text-slate-400 dark:hover:border-slate-700/60 dark:hover:bg-slate-800/70 dark:hover:text-slate-100";
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
        {activePageId === page.id && (
          <span
            className={`nav-active-bar ${ACCENT_STYLES[page.accent]?.activeBar ?? "bg-violet-500"}`}
            aria-hidden="true"
          />
        )}
        <PageIcon
          pageId={page.id}
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${activePageId === page.id ? "scale-110" : "group-hover:scale-110"}`}
        />
        <span className="truncate">{page.title}</span>
      </button>
    </li>
  ));

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 py-3 shadow-[0_4px_24px_-12px_rgb(15_23_42/0.12)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/85 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-md shadow-violet-500/25">
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
        className={`fixed inset-y-0 left-0 z-50 flex h-svh w-[min(18rem,calc(100vw-1rem))] max-w-[85vw] flex-col border-r border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/80 shadow-2xl shadow-slate-900/10 transition-transform duration-300 ease-out dark:border-slate-700/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950/90 dark:shadow-black/30 lg:w-72 lg:max-w-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-500/[0.06] to-transparent dark:from-violet-500/10" aria-hidden="true" />

        <div className="relative shrink-0 border-b border-slate-200/80 px-4 py-4 dark:border-slate-700/80 sm:px-6 sm:py-5 lg:px-6 lg:py-6">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-500/30 ring-4 ring-violet-500/10 transition-transform duration-500 hover:scale-105 sm:h-11 sm:w-11">
              <div className="absolute inset-0 animate-pulse-glow rounded-xl bg-violet-400/20 blur-md" aria-hidden="true" />
              <Shield className="relative h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:text-base">
                Auditoría Flonic
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
                Portal de seguridad
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="ml-auto rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav
          className="relative min-h-0 flex-1 overflow-y-auto px-3 py-4"
          aria-label="Secciones de la auditoría"
        >
          <ul className="space-y-1">{navItems}</ul>
        </nav>

        <footer className="shrink-0 border-t border-slate-200/80 bg-slate-50/50 px-3 py-3 dark:border-slate-700/80 dark:bg-slate-800/30 sm:px-4 sm:py-3.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <p className="text-left text-[10px] leading-snug text-slate-400 dark:text-slate-500 sm:text-[11px]">
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
