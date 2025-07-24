import React, { createContext, useContext, useState, useCallback } from 'react';
import { TOAST_TYPES, TOAST_POSITIONS } from '../components/ui/Toast';

// Toast Context
const ToastContext = createContext();

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Toast Provider Component
export const ToastProvider = ({ children, position = TOAST_POSITIONS.TOP_RIGHT }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toastData) => {
    const id = generateId();
    const toast = {
      id,
      ...toastData,
      timestamp: Date.now()
    };

    setToasts(prev => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.SUCCESS,
      message,
      title: options.title || 'Success!',
      duration: options.duration || 5000,
      ...options
    });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.ERROR,
      message,
      title: options.title || 'Error!',
      duration: options.duration || 7000,
      ...options
    });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.WARNING,
      message,
      title: options.title || 'Warning!',
      duration: options.duration || 6000,
      ...options
    });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.INFO,
      message,
      title: options.title || 'Info',
      duration: options.duration || 5000,
      ...options
    });
  }, [addToast]);

  const loading = useCallback((message, options = {}) => {
    return addToast({
      type: TOAST_TYPES.LOADING,
      message,
      title: options.title || 'Loading...',
      duration: 0, // Loading toasts don't auto-dismiss
      showProgress: false,
      ...options
    });
  }, [addToast]);

  // Promise-based toast for async operations
  const promise = useCallback(async (promiseOrFunction, options = {}) => {
    const loadingId = loading(
      options.loading?.message || 'Processing...',
      options.loading
    );

    try {
      const result = typeof promiseOrFunction === 'function' 
        ? await promiseOrFunction() 
        : await promiseOrFunction;

      removeToast(loadingId);
      success(
        options.success?.message || 'Operation completed successfully!',
        options.success
      );

      return result;
    } catch (err) {
      removeToast(loadingId);
      error(
        options.error?.message || err.message || 'Operation failed!',
        options.error
      );
      throw err;
    }
  }, [loading, removeToast, success, error]);

  const value = {
    toasts,
    position,
    addToast,
    removeToast,
    clearAllToasts,
    updateToast,
    success,
    error,
    warning,
    info,
    loading,
    promise
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

// Higher-order component for easy integration
export const withToast = (Component) => {
  return function WrappedComponent(props) {
    return (
      <ToastProvider>
        <Component {...props} />
      </ToastProvider>
    );
  };
};

export default useToast;
