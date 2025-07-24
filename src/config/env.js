/**
 * Environment configuration and validation
 */

// Environment variables with defaults
export const ENV = {
  // EmailJS Configuration
  EMAILJS_SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  EMAILJS_INQUIRY_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_INQUIRY_TEMPLATE_ID || 'your_inquiry_template_id',
  EMAILJS_CONTACT_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || 'your_contact_template_id',
  EMAILJS_PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',

  // Analytics
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',

  // App Configuration
  NODE_ENV: import.meta.env.MODE || 'development',
  DEV: import.meta.env.DEV || false,
  PROD: import.meta.env.PROD || false,
};

// Validation functions
export const validateEmailJSConfig = () => {
  const required = [
    'EMAILJS_SERVICE_ID',
    'EMAILJS_INQUIRY_TEMPLATE_ID', 
    'EMAILJS_CONTACT_TEMPLATE_ID',
    'EMAILJS_PUBLIC_KEY'
  ];
  
  const missing = required.filter(key => 
    !ENV[key] || ENV[key].startsWith('your_')
  );
  
  if (missing.length > 0) {
    console.warn('Missing EmailJS configuration:', missing);
    return false;
  }
  
  return true;
};

export const validateAnalyticsConfig = () => {
  if (!ENV.GA_TRACKING_ID && ENV.PROD) {
    console.warn('Google Analytics tracking ID not configured for production');
    return false;
  }
  return true;
};

// Development helpers
export const isDevelopment = () => ENV.NODE_ENV === 'development';
export const isProduction = () => ENV.NODE_ENV === 'production';

// Configuration status
export const getConfigStatus = () => {
  return {
    emailjs: validateEmailJSConfig(),
    analytics: validateAnalyticsConfig(),
    environment: ENV.NODE_ENV,
    ready: validateEmailJSConfig() && (validateAnalyticsConfig() || isDevelopment())
  };
};

// Log configuration status in development
if (isDevelopment()) {
  console.log('🔧 Environment Configuration:', getConfigStatus());
}
