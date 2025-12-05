import React from "react";
/* eslint-disable react/prop-types */

export default function ResultCard({ result }) {
  if (!result) return null;

  const selectedNail = result.selected_nail;

  // 🔥 Mapeo correcto para XAI (backend puede enviar "gradcam" o "selected_nail_xai")
  const gradcam = result.gradcam || result.selected_nail_xai;

  const prob =
    typeof result.probability === "number"
      ? (result.probability * 100).toFixed(2)
      : result.probability;

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-800">
        Resultado del análisis
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Valores numéricos */}
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-slate-700">Clase: </span>
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              {result.class}
            </span>
          </p>

          <p>
            <span className="font-semibold text-slate-700">Probabilidad:</span>{" "}
            {prob}%
          </p>

          {selectedNail && (
            <div className="mt-4">
              <h4 className="font-semibold text-slate-800 mb-2">
                Métricas de la uña detectada
              </h4>
              <ul className="text-sm text-slate-700 space-y-1">
                <li><b>BBox:</b> {JSON.stringify(selectedNail.bbox)}</li>
                <li><b>Área:</b> {selectedNail.area}</li>
                <li><b>Relación de aspecto:</b> {selectedNail.aspect_ratio}</li>
                <li><b>Nitidez:</b> {selectedNail.sharpness}</li>
                <li><b>Score:</b> {selectedNail.score}</li>
              </ul>
            </div>
          )}
        </div>

        {/* Imagen del recorte */}
        <div className="space-y-4">
          {selectedNail?.crop_image_base64 && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Uña seleccionada</h4>
              <img
                src={`data:image/jpeg;base64,${selectedNail.crop_image_base64}`}
                alt="Recorte de la uña"
                className="rounded-xl shadow-md max-h-64 mx-auto"
              />
            </div>
          )}

          {/* GradCAM compacto */}
          {gradcam && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">Grad-CAM++</h4>
              <img
                src={`data:image/png;base64,${gradcam}`}
                className="rounded-xl shadow-md max-h-64 mx-auto"
                alt="GradCAM++"
              />
            </div>
          )}
        </div>
      </div>

    

    </div>
  );
}
