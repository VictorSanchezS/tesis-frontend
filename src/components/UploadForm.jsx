import React from "react";
import { useState } from "react";
import Loader from "./Loader";
import ResultCard from "./ResultCard";

const API_URL = "https://tesis-backend-3zpk.onrender.com/predict-hand";

export default function UploadForm() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [useXAI, setUseXAI] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setErrorMsg("Por favor, selecciona una imagen primero.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await fetch(`${API_URL}?xai=${useXAI}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al procesar la imagen");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "No se pudo conectar al servidor. Si Render está en plan free, puede tardar en activarse. Intenta nuevamente."
      );
    }

    setLoading(false);
  };

  return (
    <div className="w-full px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Detector de Anemia por Uñas
          </h1>
          <p className="text-slate-600 mt-1">
            Sube una imagen de una mano para analizar automáticamente la uña.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6">
          <label
            htmlFor="file"
            className="block border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
            <p className="font-medium text-slate-800">
              Haz clic para subir una imagen
            </p>
            <p className="text-xs text-slate-500">
              (Formatos soportados: JPG, PNG)
            </p>
            <input
              id="file"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {previewUrl && (
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-1">Previsualización:</p>
              <img
                src={previewUrl}
                className="rounded-xl shadow-md max-h-72 object-contain mx-auto"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 shadow-md transition">
            {loading ? "Analizando..." : "Analizar imagen"}
          </button>
          <div className="flex items-center mt-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={useXAI}
                onChange={() => setUseXAI(!useXAI)}
              />
              <div
                className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer
                    peer-checked:bg-blue-600 transition-all"></div>
              <div
                className="absolute w-5 h-5 bg-white rounded-full left-1 top-0.5
                    peer-checked:translate-x-full transition-all"></div>
            </label>

            <span className="ml-3 text-sm text-slate-700">
              Activar explicabilidad (XAI)
            </span>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm mt-3 text-center">{errorMsg}</p>
          )}

          {loading && <Loader />}
        </form>

        <ResultCard result={result} />
      </div>
    </div>
  );
}
