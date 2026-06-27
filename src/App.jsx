import { useEffect, useState } from "react";
import Activos from "./components/activos";
import Comandos from "./components/comandos";
import Controles from "./components/controles";
import InyeccionSQL from "./components/inyeccionsql";
import Matriz from "./components/matriz";
import Prompts from "./components/prompts";
import Recuperacion from "./components/recuperacion";
import Resumen from "./components/resumen";
import XSS from "./components/xss";
import Navigation from "./components/layout/Navigation";
import { PAGES } from "./config/pages";

const PAGE_COMPONENTS = {
  resumen: Resumen,
  inyeccionsql: InyeccionSQL,
  xss: XSS,
  comandos: Comandos,
  activos: Activos,
  matriz: Matriz,
  controles: Controles,
  recuperacion: Recuperacion,
  prompts: Prompts,
};

function App() {
  const [activePageId, setActivePageId] = useState(PAGES[0].id);
  const ActivePage = PAGE_COMPONENTS[activePageId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activePageId]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 lg:flex-row">
      <div
        className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-60 dark:opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 hidden bg-dot-pattern opacity-50 sm:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -left-32 top-0 hidden h-[320px] w-[320px] rounded-full bg-violet-400/10 blur-[100px] sm:block sm:h-[480px] sm:w-[480px] dark:bg-violet-600/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -right-24 bottom-0 hidden h-[280px] w-[280px] rounded-full bg-indigo-400/8 blur-[90px] sm:block sm:h-[420px] sm:w-[420px] dark:bg-indigo-500/12"
        aria-hidden="true"
      />

      <Navigation activePageId={activePageId} onNavigate={setActivePageId} />

      <main className="relative min-w-0 flex-1 overflow-x-hidden lg:ml-72">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(124,58,237,0.1),transparent_55%)] dark:bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(124,58,237,0.16),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          {ActivePage && (
            <div key={activePageId} className="animate-page-enter">
              <ActivePage />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;