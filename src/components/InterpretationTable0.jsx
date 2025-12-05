import React from "react";
export default function InterpretationTable0() {
  return (
    <div className="mt-12 bg-white shadow-lg rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        🟢 Escenarios — Clase 0 (No Anemia)
      </h2>

      <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-semibold">
              <th className="px-4 py-3 border-b border-slate-300">Probabilidad</th>
              <th className="px-4 py-3 border-b border-slate-300">Confianza</th>
              <th className="px-4 py-3 border-b border-slate-300">Interpretación</th>
              <th className="px-4 py-3 border-b border-slate-300">Recomendación</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["0–1%", "Extrema", "No anemia", "Completamente confiable"],
              ["1–5%", "Muy alta", "No anemia", "Confiable"],
              ["5–10%", "Alta", "Muy improbable anemia", "Sin preocupación"],
              ["10–20%", "Media", "Escasa evidencia", "Repetir si hay dudas"],
              ["20–30%", "Baja", "Resultado ambiguo", "Repetir imagen"],
              ["30–40%", "Muy baja", "Modelo confundido", "Repetir obligatoriamente"],
              ["40–50%", "Casi nula", "Modelo dudando severo", "Repetir imagen"],
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 border-t border-slate-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
