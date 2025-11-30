import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./lib/queryClient.ts";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes.tsx";
import { ToastProvider } from "./components/toast/ToastProvider.tsx";
import ToastContainer from "./components/toast/ToastContainer.tsx";
import "./styles/components/_toast.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
