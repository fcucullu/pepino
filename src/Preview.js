import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Preview = () => {
  const { projectId } = useParams();
  const [designData, setDesignData] = useState(null);

  useEffect(() => {
    // Cargar diseño desde localStorage (esto se cambiará a una API en el futuro)
    const savedData = localStorage.getItem(`design-${projectId}`);
    if (savedData) {
      setDesignData(JSON.parse(savedData));
    }
  }, [projectId]);

  if (!designData) {
    return <h2>Diseño no encontrado</h2>;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: designData.pages[0].frames[0].html }} />
  );
};

export default Preview;
