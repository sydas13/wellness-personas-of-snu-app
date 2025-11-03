import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Form />
  </StrictMode>
);
