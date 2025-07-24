import React from 'react';
import { useBackendConnection } from '../hooks/useApi';

const BackendStatus = () => {
  const { isConnected, connectionError, checking, checkConnection } = useBackendConnection();

  if (checking) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
          <span className="text-sm font-medium">Checking backend connection...</span>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-start space-x-2">
          <div className="flex-shrink-0">
            <span className="text-red-600">❌</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Backend Disconnected</p>
            <p className="text-xs text-red-600 mt-1">
              {connectionError || 'Cannot connect to http://localhost:3001'}
            </p>
            <button
              onClick={checkConnection}
              className="mt-2 text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-green-600">✅</span>
        <span className="text-sm font-medium">Backend Connected</span>
      </div>
    </div>
  );
};

export default BackendStatus;
