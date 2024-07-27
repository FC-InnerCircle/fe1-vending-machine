import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import VendingMachineProvider from "./providers/VendingMachineProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <VendingMachineProvider>
      <App />
    </VendingMachineProvider>
  </React.StrictMode>
);
