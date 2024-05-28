import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import App from "./components/App";
import { ThemeProvider } from "./components/providers/theme-provider";
import AuthProvider from "./components/providers/auth-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
