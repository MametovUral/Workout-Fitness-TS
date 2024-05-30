import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import App from "./components/App";
import { ThemeProvider } from "./components/providers/theme-provider";
import AuthProvider from "./components/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
