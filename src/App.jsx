import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-900 to-[#b8860b] text-white text-center">
        <div className="bg-black/60 p-10 rounded-2xl shadow-xl max-w-lg">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="text-3xl font-bold mb-4">Website Under Construction</h1>
          <p className="text-lg leading-relaxed">
            We’re working hard to bring something amazing. <br />
            Please check back soon!
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
