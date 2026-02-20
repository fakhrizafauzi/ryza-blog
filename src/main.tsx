console.log("main.tsx: Module loading...");
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { SiteSettingsProvider } from "@/components/shared/SiteSettingsProvider"
import { Toaster } from "@/components/shared/Toaster"
import { router } from "@/router"
import "@/styles/globals.css"


class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
    console.log("ErrorBoundary: Initialized");
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", color: "red" }}>
          <h1>Application Error</h1>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log("main.tsx: Mounting React app...");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>

      <HelmetProvider>
        <SiteSettingsProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SiteSettingsProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
)
