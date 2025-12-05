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
              <h4 className="font-semibold text-slate-800 mb-2">Grad-CAM</h4>
              <img
                src={`data:image/png;base64,${gradcam}`}
                className="rounded-xl shadow-md max-h-64 mx-auto"
                alt="GradCAM"
              />
            </div>
          )}
        </div>
      </div>

      {/* 🔥 SECCIÓN XAI COMPLETA */}
      {gradcam && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Explicabilidad (XAI)
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Uña seleccionada */}
            {selectedNail?.crop_image_base64 && (
              <div className="bg-white rounded-xl shadow p-4">
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Uña seleccionada
                </h4>

                <img
                  src={`data:image/jpeg;base64,${selectedNail.crop_image_base64}`}
                  alt="Recorte de la uña"
                  className="rounded-lg shadow-md w-full max-h-80 object-contain mx-auto"
                />
              </div>
            )}

            {/* GradCAM++ */}
            <div className="bg-white rounded-xl shadow p-4">
              <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span>🔥</span> Grad-CAM++
              </h4>

              <img
                src={`data:image/png;base64,${gradcam}`}
                alt="GradCAM"
                className="rounded-lg shadow-md w-full max-h-80 object-contain mx-auto"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
