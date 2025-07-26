/**
 * Application constants and configuration
 */

// Brand Colors
export const COLORS = {
  primary: '#d4af37',      // Gold
  primaryDark: '#b8860b',  // Dark Gold
  secondary: '#006400',    // Dark Green
  accent: '#fef9ec',       // Light cream
  success: '#10b981',      // Green
  error: '#ef4444',        // Red
  warning: '#f59e0b',      // Amber
  info: '#3b82f6',         // Blue
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation Durations
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  hero: 6000,  // Hero slider interval
};

// Form Configuration
export const FORM_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxMessageLength: 1000,
  maxNameLength: 100,
  phoneRegex: /^[\+]?[1-9][\d]{0,15}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Rate Limiting
export const RATE_LIMITS = {
  formSubmission: {
    maxAttempts: 3,
    windowMs: 10 * 60 * 1000, // 10 minutes
  },
  apiCalls: {
    maxAttempts: 10,
    windowMs: 60 * 1000, // 1 minute
  },
};

// Gallery Categories
export const GALLERY_CATEGORIES = {
  WEDDINGS: 'Weddings',
  BIRTHDAYS: 'Birthdays',
  BABY_SHOWERS: 'Baby Showers',
  CORPORATE: 'Corporate Events',
  KIDS: 'Kids',
};

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  INQUIRY: '/inquiryform',
  REVIEWS: '/review',
  NOT_FOUND: '*',
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/pinchofluxeevents',
  instagram: 'https://instagram.com/pinchofluxeevents',
  twitter: 'https://twitter.com/pinchofluxeevents',
  linkedin: 'https://linkedin.com/company/pinchofluxeevents',
  youtube: 'https://youtube.com/pinchofluxeevents',
};

// Contact Information
export const CONTACT_INFO = {
  email: 'pinchofluxeevents@gmail.com',
  phone: '+1 (301) 906-3939',
  address: {
    street: 'Professional Event Planning Services',
    city: 'Maryland',
    state: 'MD',
    zip: '20001',
    country: 'United States',
  },
  hours: {
    weekdays: '9:00 AM - 6:00 PM',
    weekends: '10:00 AM - 4:00 PM',
    timezone: 'EST',
  },
};

// SEO Configuration
export const SEO = {
  defaultTitle: 'Pinch of Luxe Events | Professional Event Planning & Balloon Decorations',
  titleTemplate: '%s | Pinch of Luxe Events',
  defaultDescription: 'Transform your special events with Pinch of Luxe Events\'s professional balloon decorations, floral design, and comprehensive event planning services.',
  keywords: [
    'balloon decorations',
    'event planning',
    'wedding decorations',
    'corporate events',
    'party planning',
    'floral design',
    'balloon arch',
    'event design',
  ],
  author: 'Pinch of Luxe Events',
  siteUrl: 'https://pinchofluxeevents.com',
  image: '/chi.jpg',
};

// Performance Configuration
export const PERFORMANCE = {
  imageQuality: 75,
  lazyLoadOffset: '50px',
  intersectionThreshold: 0.1,
  debounceDelay: 300,
  throttleDelay: 100,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  FORM_VALIDATION: 'Please check your form inputs and try again.',
  EMAIL_SEND_FAILED: 'Failed to send email. Please try again or contact us directly.',
  RATE_LIMIT_EXCEEDED: 'Too many attempts. Please wait before trying again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  CONFIG_ERROR: 'Service configuration error. Please contact support.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Thank you for your message! We\'ll get back to you soon.',
  EMAIL_SENT: 'Your email has been sent successfully!',
  SUBSCRIPTION_SUCCESS: 'Successfully subscribed to our newsletter!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'chi-ballon-theme',
  LANGUAGE: 'chi-ballon-language',
  FORM_DRAFT: 'chi-ballon-form-draft',
  USER_PREFERENCES: 'chi-ballon-preferences',
};

// API Endpoints (if needed)
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  INQUIRY: '/api/inquiry',
  NEWSLETTER: '/api/newsletter',
  ANALYTICS: '/api/analytics',
};

// Feature Flags
export const FEATURES = {
  ANALYTICS_ENABLED: true,
  SERVICE_WORKER_ENABLED: true,
  PERFORMANCE_MONITORING: true,
  ERROR_TRACKING: true,
  NEWSLETTER_SIGNUP: false,
  LIVE_CHAT: false,
  BOOKING_SYSTEM: false,
};

// Image Paths
export const IMAGES = {
  LOGO: '/chi.jpg',
  HERO_DEFAULT: '/chi43.jpg',
  OWNER: '/owner.jpg',
  PLACEHOLDER: '/pfx.jpg',
};

// External Services
export const EXTERNAL_SERVICES = {
  GOOGLE_ANALYTICS: 'https://www.googletagmanager.com/gtag/js',
  EMAILJS: 'https://cdn.emailjs.com',
  FONTS: 'https://fonts.googleapis.com',
};

export default {
  COLORS,
  BREAKPOINTS,
  ANIMATIONS,
  FORM_CONFIG,
  RATE_LIMITS,
  GALLERY_CATEGORIES,
  ROUTES,
  SOCIAL_LINKS,
  CONTACT_INFO,
  SEO,
  PERFORMANCE,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  API_ENDPOINTS,
  FEATURES,
  IMAGES,
  EXTERNAL_SERVICES,
};
