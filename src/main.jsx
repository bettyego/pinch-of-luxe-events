
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Initialize application systems
const initializeApp = async () => {
  // Initialize storage
  try {
    const { initializeStorage } = await import("./utils/storage");
    initializeStorage();
  } catch (error) {
    console.warn('Storage initialization failed:', error);
  }

  // Initialize performance monitoring
  try {
    const { initPerformanceMonitoring } = await import("./utils/performance");
    initPerformanceMonitoring();
  } catch (error) {
    console.warn('Performance monitoring initialization failed:', error);
  }
};

// Initialize systems
initializeApp().catch(console.error);

// Error boundary for the root
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render app:", error);
  // Fallback content
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>Loading Error</h1>
      <p>There was an error loading the application. Please refresh the page.</p>
      <p style="color: #666; font-size: 14px;">Error: ${error.message}</p>
    </div>
  `;
}

// Register service worker (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
