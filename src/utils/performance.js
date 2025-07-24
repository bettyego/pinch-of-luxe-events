/**
 * Performance monitoring and optimization utilities
 */

// Performance thresholds (in milliseconds)
export const PERFORMANCE_THRESHOLDS = {
  LCP: 2500,  // Largest Contentful Paint
  FID: 100,   // First Input Delay
  CLS: 0.1,   // Cumulative Layout Shift
  FCP: 1800,  // First Contentful Paint
  TTFB: 600,  // Time to First Byte
  INP: 200,   // Interaction to Next Paint
};

// Performance budget limits
export const PERFORMANCE_BUDGET = {
  BUNDLE_SIZE: 1000, // KB
  IMAGE_SIZE: 500,   // KB
  FONT_SIZE: 100,    // KB
  CSS_SIZE: 50,      // KB
};

/**
 * Measure and log component render performance
 */
export const measureRenderTime = (componentName, renderFunction) => {
  const startTime = performance.now();
  const result = renderFunction();
  const endTime = performance.now();
  
  if (import.meta.env.MODE === 'development') {
    console.log(`🚀 ${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
  }
  
  return result;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img);
    });
  }
};

/**
 * Preload critical resources
 */
export const preloadResource = (href, as = 'image', crossorigin = null) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = crossorigin;
  document.head.appendChild(link);
};

/**
 * Monitor Core Web Vitals
 */
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID)
  const observeFID = () => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  };

  // Only run in production
  if (import.meta.env.MODE === 'production') {
    observeLCP();
    observeFID();
    observeCLS();
  }
};

/**
 * Memory usage monitoring
 */
export const monitorMemoryUsage = () => {
  if (performance.memory && import.meta.env.MODE === 'development') {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`
    });
  }
};

/**
 * Bundle size analyzer helper
 */
export const analyzeBundleSize = () => {
  if (import.meta.env.MODE === 'development') {
    console.log('📦 To analyze bundle size, run: npm run analyze');
  }
};

/**
 * Performance timing helper
 */
export class PerformanceTimer {
  constructor(name) {
    this.name = name;
    this.startTime = null;
  }

  start() {
    this.startTime = performance.now();
    return this;
  }

  end() {
    if (!this.startTime) {
      console.warn('Timer not started');
      return;
    }
    
    const duration = performance.now() - this.startTime;
    console.log(`⏱️ ${this.name}: ${duration.toFixed(2)}ms`);
    return duration;
  }
}

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  measureWebVitals();
  
  // Monitor memory usage every 30 seconds in development
  if (import.meta.env.MODE === 'development') {
    setInterval(monitorMemoryUsage, 30000);
  }
};
