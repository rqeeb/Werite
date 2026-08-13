import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const elem = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <Routes>
      <Route path="/document/:id" element={<App/>}/>
      <Route path="/" element={<App/>} />
    </Routes>
  </BrowserRouter>
);

(import.meta.hot.data.root ??= createRoot(elem)).render(app);
