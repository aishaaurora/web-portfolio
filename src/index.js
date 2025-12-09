import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// TIDAK ADA LAGI DATA DISINI. 
// SEMUA DATA SUDAH PINDAH KE folder src/constants/index.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* BAGIAN PENTING: App dibungkus BrowserRouter agar bisa pindah halaman */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);