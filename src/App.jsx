import React from "react";
import UploadForm from "./components/UploadForm";
import InterpretationTable0 from "./components/InterpretationTable0";
import InterpretationTable1 from "./components/InterpretationTable1";

export default function App() {
  return (
    <div className="pb-20">
      <UploadForm />

      {/* 🔥 Aquí aparece la tabla */}
      <InterpretationTable0 />
      <InterpretationTable1 />
    </div>
  );
}
