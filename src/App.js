import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GrapesEditor from "./GrapesEditor";
import Preview from "./Preview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GrapesEditor />} />
        <Route path="/preview/:projectId" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
