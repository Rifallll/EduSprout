import React from "react";
import ReactDOM from "react-dom/client"; // Mengubah dari named import menjadi namespace import
import App from "./App.tsx";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);