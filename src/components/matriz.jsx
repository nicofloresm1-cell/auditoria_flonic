import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownLanding from "./shared/MarkdownLanding";
import { PAGE_META } from "../config/pages";
import content from "../../docs_auditoria_flonic/matriz_flonic.md?raw";

const RIESGOS = [
  { id: "R1", label: "R1 (25)", prob: 5, impacto: 5 },
  { id: "R2", label: "R2 (12)", prob: 4, impacto: 3 },
  { id: "R3", label: "R3 (15)", prob: 3, impacto: 5 },
  { id: "R4", label: "R4 (12)", prob: 3, impacto: 4 },
  { id: "R5", label: "R5 (8)", prob: 2, impacto: 4 },
  { id: "R6", label: "R6 (10)", prob: 2, impacto: 5 },
];

const COLORES = {
  bajo: "bg-green-100 text-green-900 dark:bg-green-900/40 dark:text-green-100",
  medio: "bg-amber-200 text-amber-900 dark:bg-amber-800/60 dark:text-amber-100",
  alto: "bg-orange-300 text-orange-900 dark:bg-orange-800/60 dark:text-orange-100",
  critico: "bg-red-300 text-red-900 dark:bg-red-800/60 dark:text-red-100",
};

function nivelDeRiesgo(valor) {
  if (valor >= 16) return "critico";
  if (valor >= 10) return "alto";
  if (valor >= 5) return "medio";
  return "bajo";
}

function HeatMap() {
  const probs = [5, 4, 3, 2, 1];
  const impactos = [1, 2, 3, 4, 5];

  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[480px] grid-cols-6 gap-1">
        <div />
        {impactos.map((i) => (
          <div key={i} className="text-center text-xs text-slate-500 dark:text-slate-400 py-1">
            Impacto {i}
          </div>
        ))}
        {probs.map((p) => (
          <div key={p} className="contents">
            <div className="flex items-center justify-end pr-2 text-xs text-slate-500 dark:text-slate-400">
              Prob. {p}
            </div>
            {impactos.map((i) => {
              const valor = p * i;
              const riesgo = RIESGOS.find((r) => r.prob === p && r.impacto === i);
              const nivel = nivelDeRiesgo(valor);
              return (
                <div
                  key={i}
                  className={`flex h-14 items-center justify-center rounded-md text-sm font-medium ${COLORES[nivel]}`}
                >
                  {riesgo ? riesgo.label : valor}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-green-100 dark:bg-green-900/40" /> Bajo (1-4)</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-amber-200 dark:bg-amber-800/60" /> Medio (5-9)</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-orange-300 dark:bg-orange-800/60" /> Alto (10-15)</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-red-300 dark:bg-red-800/60" /> Crítico (16-25)</span>
      </div>
    </div>
  );
}

// Parte el .md justo antes de "## 4. Priorización" para insertar el mapa de calor ahí
const marker = "## 4. Priorización";
const splitIndex = content.indexOf(marker);
const parteAntes = splitIndex >= 0 ? content.slice(0, splitIndex) : content;
const parteDespues = splitIndex >= 0 ? content.slice(splitIndex) : "";

export default function Matriz() {
  return (
    <div>
      <MarkdownLanding pageId="matriz" {...PAGE_META.matriz} content={parteAntes} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800/90">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          3. Mapa de calor — Probabilidad × Impacto
        </h2>
        <HeatMap />
        <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
    <strong className="text-slate-700 dark:text-slate-300">Cómo leer este mapa de calor:</strong>{" "}
    cada celda cruza una probabilidad (eje vertical) con un impacto (eje horizontal); el número
    es el resultado de Probabilidad × Impacto, el "puntaje de riesgo" de esa combinación (escala
    1 a 25). Las celdas que muestran solo un número no corresponden a ningún riesgo identificado
    en esta auditoría — se incluyen únicamente como referencia visual de la escala completa. Las
    celdas etiquetadas "R# (n)" son los seis riesgos reales de la sección 2, ubicados según su
    propia probabilidad e impacto. El color de cada celda depende del rango en que cae el puntaje,
    no del número exacto: Verde (1-4) = Bajo, Ámbar (5-9) = Medio, Naranjo (10-15) = Alto, Rojo
    (16-25) = Crítico — por eso riesgos con números distintos (como R4 con 12 y R3 con 15) pueden
    compartir el mismo color, ya que ambos caen en el rango "Alto".
  </p>
      </div>

      {parteDespues && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-10 dark:border-slate-700 dark:bg-slate-800/90">
          <div className="md-content prose prose-slate max-w-none text-left dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{parteDespues}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}