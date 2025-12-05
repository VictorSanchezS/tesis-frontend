import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-slate-600">
        Analizando imagen, por favor espera...
      </span>
    </div>
  );
}
