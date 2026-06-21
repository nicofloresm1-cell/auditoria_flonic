import { useState } from "react";
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

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100 lg:flex-row">
      <Navigation activePageId={activePageId} onNavigate={setActivePageId} />

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          {ActivePage && <ActivePage />}
        </div>
      </main>
    </div>
  );
}

export default App;
