import React from "react";
export default function InterpretationTable1() {
  return (
    <div className="mt-12 bg-white shadow-lg rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        🔴 Escenarios — Clase 1 (Anemia)
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
              ["0–20%", "Casi cero", "Predicción incoherente", "Repetir imagen"],
              ["20–40%", "Muy baja", "Modelo dudando", "Repetir imagen"],
              ["40–60%", "Baja", "Posible anemia", "Revisión clínica"],
              ["60–80%", "Alta", "Probable anemia", "Consulta médica"],
              ["80–95%", "Muy alta", "Anemia muy probable", "Consulta médica"],
              ["95–100%", "Extrema", "Anemia altamente probable", "Consultar especialista"],
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
