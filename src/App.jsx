import "./App.css";

import Activos from "./components/activos";
import Comandos from "./components/comandos";
import Controles from "./components/controles";
import InyeccionSQL from "./components/inyeccionsql";
import Matriz from "./components/matriz";
import Prompts from "./components/prompts";
import Recuperacion from "./components/recuperacion";
import Resumen from "./components/resumen";
import XSS from "./components/xss";

function App() {
  return (
    <div className="App min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <header className="py-8 px-4">
        <h1 className="text-4xl sm:text-5xl font-semibold">Auditoría Flonic</h1>
      </header>

      <main className="container mx-auto px-4 pb-12 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Activos />
        <Comandos />
        <Controles />
        <InyeccionSQL />
        <Matriz />
        <Prompts />
        <Recuperacion />
        <Resumen />
        <XSS />
      </main>
    </div>
  );
}

export default App;
