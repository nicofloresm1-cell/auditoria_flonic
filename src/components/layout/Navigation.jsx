import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { ACCENT_STYLES, PAGES } from "../../config/pages";
import PageIcon from "../shared/PageIcon";

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
      return `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${styles.active}`;
    }

    return "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800";
  };

  const navItems = PAGES.map((page) => (
    <li key={page.id}>
      {page.id === "resumen" && (
        <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Informe 1° parte
        </p>
      )}
      {page.id === "activos" && (
        <p className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 lg:hidden">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Auditoría Flonic</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform dark:border-slate-700 dark:bg-slate-900 lg:static lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden border-b border-slate-200 px-6 py-5 dark:border-slate-700 lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              <Shield className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-slate-900 dark:text-white">Auditoría Flonic</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Portal de seguridad</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Secciones de la auditoría">
          <ul className="space-y-1">{navItems}</ul>
        </nav>

        <footer className="border-t border-slate-200 px-4 py-3 text-left text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
          AFP Horizonte · Auditoría de seguridad
        </footer>
      </aside>
    </>
  );
}
