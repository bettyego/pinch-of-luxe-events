/**
 * Touch and mobile optimization utilities
 */

/**
 * Debounce function to prevent excessive function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
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
 * Check if device is mobile
 * @returns {boolean} - True if mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Check if device supports touch
 * @returns {boolean} - True if touch is supported
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get viewport dimensions
 * @returns {Object} - Viewport width and height
 */
export const getViewportSize = () => {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
};

/**
 * Smooth scroll to element
 * @param {string|Element} target - Target element or selector
 * @param {number} offset - Offset from top in pixels
 */
export const smoothScrollTo = (target, offset = 0) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Prevent zoom on double tap for iOS
 * @param {Element} element - Element to apply prevention to
 */
export const preventZoomOnDoubleTap = (element) => {
  let lastTouchEnd = 0;
  
  element.addEventListener('touchend', (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

/**
 * Enhanced touch gesture handler
 */
export class TouchGestureHandler {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      threshold: 50, // Minimum distance for swipe
      restraint: 100, // Maximum distance perpendicular to swipe direction
      allowedTime: 300, // Maximum time for swipe
      ...options
    };
    
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    
    this.init();
  }

  init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }

  handleTouchStart(e) {
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startTime = new Date().getTime();
  }

  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = new Date().getTime();
    
    const distX = endX - this.startX;
    const distY = endY - this.startY;
    const elapsedTime = endTime - this.startTime;
    
    if (elapsedTime <= this.options.allowedTime) {
      if (Math.abs(distX) >= this.options.threshold && Math.abs(distY) <= this.options.restraint) {
        // Horizontal swipe
        const direction = distX < 0 ? 'left' : 'right';
        this.onSwipe?.(direction, { distX, distY, elapsedTime });
      } else if (Math.abs(distY) >= this.options.threshold && Math.abs(distX) <= this.options.restraint) {
        // Vertical swipe
        const direction = distY < 0 ? 'up' : 'down';
        this.onSwipe?.(direction, { distX, distY, elapsedTime });
      }
    }
  }

  onSwipe(direction, details) {
    // Override this method or set it as a property
  }

  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

/**
 * Add touch-friendly button styles
 * @param {Element} button - Button element
 */
export const makeTouchFriendly = (button) => {
  if (!button) return;
  
  // Add minimum touch target size
  const style = button.style;
  const computedStyle = window.getComputedStyle(button);
  
  if (parseInt(computedStyle.minHeight) < 44) {
    style.minHeight = '44px';
  }
  if (parseInt(computedStyle.minWidth) < 44) {
    style.minWidth = '44px';
  }
  
  // Add touch feedback
  button.addEventListener('touchstart', () => {
    button.style.opacity = '0.7';
  }, { passive: true });
  
  button.addEventListener('touchend', () => {
    setTimeout(() => {
      button.style.opacity = '';
    }, 150);
  }, { passive: true });
};

/**
 * Optimize form inputs for mobile
 * @param {Element} form - Form element
 */
export const optimizeFormForMobile = (form) => {
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Add appropriate input modes
    if (input.type === 'email') {
      input.setAttribute('inputmode', 'email');
    } else if (input.type === 'tel') {
      input.setAttribute('inputmode', 'tel');
    } else if (input.type === 'number') {
      input.setAttribute('inputmode', 'numeric');
    }
    
    // Prevent zoom on focus for iOS
    if (isMobile() && parseFloat(window.getComputedStyle(input).fontSize) < 16) {
      input.style.fontSize = '16px';
    }
  });
};
