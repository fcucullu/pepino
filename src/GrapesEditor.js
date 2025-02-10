import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";

const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: "#gjs",
        height: "100vh",
        width: "100%",
        fromElement: true,
        storageManager: false,
        plugins: [grapesjsPresetWebpage],
        pluginsOpts: {
          grapesjsPresetWebpage: {},
        },
        styleManager: {
          sectors: [
            {
              name: "Colores",
              open: false,
              buildProps: ["color", "background-color", "border-color"],
              properties: [
                {
                  name: "Color Primario",
                  property: "color",
                  type: "color",
                  defaults: "#3498db",
                },
                {
                  name: "Color Secundario",
                  property: "background-color",
                  type: "color",
                  defaults: "#2ecc71",
                },
              ],
            },
            {
              name: "Tipografía",
              open: false,
              buildProps: ["font-family", "font-size", "font-weight"],
              properties: [
                {
                  name: "Fuente",
                  property: "font-family",
                  type: "select",
                  defaults: "Arial, sans-serif",
                  options: [
                    { value: "Arial, sans-serif", name: "Arial" },
                    {
                      value: "'Times New Roman', serif",
                      name: "Times New Roman",
                    },
                    { value: "'Courier New', monospace", name: "Courier New" },
                  ],
                },
                {
                  name: "Tamaño",
                  property: "font-size",
                  type: "slider",
                  defaults: "16px",
                  min: 12,
                  max: 48,
                  step: 1,
                },
              ],
            },
          ],
        },
      });

      editorRef.current = editor;

      // Cargar diseño guardado al iniciar
      const savedData = localStorage.getItem("grapesjs-design");
      if (savedData) {
        editor.loadProjectData(JSON.parse(savedData));
      }
    }
  }, []);

  // Función para guardar diseño en localStorage
  const handleSave = () => {
    if (editorRef.current) {
      const projectData = editorRef.current.getProjectData();
      localStorage.setItem("grapesjs-design", JSON.stringify(projectData));
      alert("Diseño guardado!");
    }
  };

  // Función para cargar diseño desde localStorage
  const handleLoad = () => {
    const savedData = localStorage.getItem("grapesjs-design");
    if (savedData && editorRef.current) {
      editorRef.current.loadProjectData(JSON.parse(savedData));
      alert("Diseño cargado!");
    }
  };

  const handleShare = () => {
    if (editorRef.current) {
      const projectData = editorRef.current.getProjectData();

      // Generar un ID único (esto se reemplazará con una base de datos en el futuro)
      const projectId = Math.random().toString(36).substr(2, 9);

      // Guardar en localStorage por ahora
      localStorage.setItem(`design-${projectId}`, JSON.stringify(projectData));

      // Simulación de URL de compartición
      const shareUrl = `${window.location.origin}/preview/${projectId}`;

      // Copiar al portapapeles
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(`Diseño guardado! Comparte esta URL: ${shareUrl}`);
      });
    }
  };

  return (
    <div>
      {/* Botones para Guardar y Cargar */}
      <div
        style={{
          padding: "10px",
          background: "#333",
          color: "white",
          textAlign: "center",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            margin: "5px",
            padding: "10px",
            background: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Guardar Diseño
        </button>
        <button
          onClick={handleLoad}
          style={{
            margin: "5px",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cargar Diseño
        </button>
        <button
          onClick={handleShare}
          style={{
            margin: "5px",
            padding: "10px",
            background: "#17a2b8",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Compartir Diseño
        </button>
      </div>

      {/* Contenedor del Editor */}
      <div id="gjs"></div>
    </div>
  );
};

export default GrapesEditor;
