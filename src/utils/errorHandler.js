/**
 * Centralized error handling utilities
 */

// Error types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  API: 'API_ERROR',
  FORM: 'FORM_ERROR',
  IMAGE: 'IMAGE_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
};

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN, severity = ERROR_SEVERITY.MEDIUM, details = {}) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Error logger utility
 * @param {Error} error - Error to log
 * @param {object} context - Additional context
 */
export const logError = (error, context = {}) => {
  const errorInfo = {
    message: error.message,
    type: error.type || ERROR_TYPES.UNKNOWN,
    severity: error.severity || ERROR_SEVERITY.MEDIUM,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('🚨 Application Error:', errorInfo);
  }

  // Send to analytics in production
  if (import.meta.env.PROD && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: error.severity === ERROR_SEVERITY.CRITICAL
    });
  }

  // Store in local storage for debugging
  try {
    const errorLog = JSON.parse(localStorage.getItem('errorLog') || '[]');
    errorLog.push(errorInfo);
    // Keep only last 10 errors
    if (errorLog.length > 10) {
      errorLog.shift();
    }
    localStorage.setItem('errorLog', JSON.stringify(errorLog));
  } catch (e) {
    console.warn('Failed to store error log:', e);
  }
};

/**
 * Network error handler
 * @param {Error} error - Network error
 * @returns {object} Formatted error response
 */
export const handleNetworkError = (error) => {
  const networkError = new AppError(
    'Network connection failed. Please check your internet connection.',
    ERROR_TYPES.NETWORK,
    ERROR_SEVERITY.HIGH,
    { originalError: error.message }
  );
  
  logError(networkError);
  
  return {
    success: false,
    error: networkError.message,
    type: networkError.type,
    retry: true
  };
};

/**
 * API error handler
 * @param {Response} response - Fetch response
 * @returns {object} Formatted error response
 */
export const handleApiError = async (response) => {
  let errorMessage = 'An unexpected error occurred';
  let errorDetails = {};

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
    errorDetails = errorData;
  } catch (e) {
    errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  }

  const apiError = new AppError(
    errorMessage,
    ERROR_TYPES.API,
    response.status >= 500 ? ERROR_SEVERITY.HIGH : ERROR_SEVERITY.MEDIUM,
    { status: response.status, ...errorDetails }
  );

  logError(apiError);

  return {
    success: false,
    error: apiError.message,
    type: apiError.type,
    status: response.status
  };
};

/**
 * Form validation error handler
 * @param {object} validationErrors - Validation errors object
 * @returns {object} Formatted error response
 */
export const handleValidationError = (validationErrors) => {
  const errorMessage = 'Please correct the highlighted fields';
  
  const validationError = new AppError(
    errorMessage,
    ERROR_TYPES.VALIDATION,
    ERROR_SEVERITY.LOW,
    { validationErrors }
  );

  logError(validationError);

  return {
    success: false,
    error: errorMessage,
    type: ERROR_TYPES.VALIDATION,
    validationErrors
  };
};

/**
 * Global error boundary handler
 * @param {Error} error - React error
 * @param {object} errorInfo - React error info
 */
export const handleGlobalError = (error, errorInfo) => {
  const globalError = new AppError(
    error.message,
    ERROR_TYPES.UNKNOWN,
    ERROR_SEVERITY.CRITICAL,
    { 
      componentStack: errorInfo.componentStack,
      errorBoundary: true
    }
  );

  logError(globalError);
};

/**
 * Retry mechanism for failed operations
 * @param {Function} operation - Operation to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries (ms)
 * @returns {Promise} Operation result
 */
export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
};

/**
 * Safe async operation wrapper
 * @param {Function} operation - Async operation
 * @param {string} context - Operation context
 * @returns {Promise<object>} Safe operation result
 */
export const safeAsync = async (operation, context = 'Unknown operation') => {
  try {
    const result = await operation();
    return { success: true, data: result };
  } catch (error) {
    logError(error, { context });
    return {
      success: false,
      error: error.message,
      type: error.type || ERROR_TYPES.UNKNOWN
    };
  }
};

export default {
  ERROR_TYPES,
  ERROR_SEVERITY,
  AppError,
  logError,
  handleNetworkError,
  handleApiError,
  handleValidationError,
  handleGlobalError,
  retryOperation,
  safeAsync
};
