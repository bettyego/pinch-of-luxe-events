/**
 * Local Storage utility functions with error handling
 */

import { STORAGE_KEYS } from '../constants';

/**
 * Safely get item from localStorage
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    // Try to parse JSON, fallback to string
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.warn(`Failed to get storage item "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 */
export const setStorageItem = (key, value) => {
  try {
    if (typeof window === 'undefined') return false;
    
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.warn(`Failed to set storage item "${key}":`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 */
export const removeStorageItem = (key) => {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove storage item "${key}":`, error);
    return false;
  }
};

/**
 * Clear all localStorage items
 */
export const clearStorage = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    localStorage.clear();
    return true;
  } catch (error) {
    console.warn('Failed to clear storage:', error);
    return false;
  }
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') return false;
    
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get storage usage information
 */
export const getStorageInfo = () => {
  if (!isStorageAvailable()) {
    return { available: false };
  }

  try {
    let totalSize = 0;
    const items = {};

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const size = localStorage[key].length;
        items[key] = size;
        totalSize += size;
      }
    }

    return {
      available: true,
      totalSize,
      items,
      itemCount: Object.keys(items).length,
    };
  } catch (error) {
    console.warn('Failed to get storage info:', error);
    return { available: true, error: error.message };
  }
};

/**
 * Application-specific storage functions
 */

// User preferences
export const getUserPreferences = () => {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    language: 'en',
    notifications: true,
    analytics: true,
  });
};

export const setUserPreferences = (preferences) => {
  const current = getUserPreferences();
  const updated = { ...current, ...preferences };
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, updated);
};

// Form drafts
export const getFormDraft = (formName) => {
  const drafts = getStorageItem(STORAGE_KEYS.FORM_DRAFT, {});
  return drafts[formName] || null;
};

export const setFormDraft = (formName, data) => {
  const drafts = getStorageItem(STORAGE_KEYS.FORM_DRAFT, {});
  drafts[formName] = {
    data,
    timestamp: Date.now(),
  };
  return setStorageItem(STORAGE_KEYS.FORM_DRAFT, drafts);
};

export const removeFormDraft = (formName) => {
  const drafts = getStorageItem(STORAGE_KEYS.FORM_DRAFT, {});
  delete drafts[formName];
  return setStorageItem(STORAGE_KEYS.FORM_DRAFT, drafts);
};

// Theme management
export const getTheme = () => {
  return getStorageItem(STORAGE_KEYS.THEME, 'light');
};

export const setTheme = (theme) => {
  return setStorageItem(STORAGE_KEYS.THEME, theme);
};

// Language management
export const getLanguage = () => {
  return getStorageItem(STORAGE_KEYS.LANGUAGE, 'en');
};

export const setLanguage = (language) => {
  return setStorageItem(STORAGE_KEYS.LANGUAGE, language);
};

/**
 * Storage cleanup utility
 */
export const cleanupOldData = (maxAge = 7 * 24 * 60 * 60 * 1000) => { // 7 days default
  try {
    const now = Date.now();
    const drafts = getStorageItem(STORAGE_KEYS.FORM_DRAFT, {});
    let cleaned = false;

    for (const [formName, draft] of Object.entries(drafts)) {
      if (draft.timestamp && (now - draft.timestamp) > maxAge) {
        delete drafts[formName];
        cleaned = true;
      }
    }

    if (cleaned) {
      setStorageItem(STORAGE_KEYS.FORM_DRAFT, drafts);
      console.log('Cleaned up old form drafts');
    }

    return cleaned;
  } catch (error) {
    console.warn('Failed to cleanup old data:', error);
    return false;
  }
};

/**
 * Storage event listener for cross-tab communication
 */
export const onStorageChange = (callback) => {
  if (typeof window === 'undefined') return () => {};

  const handleStorageChange = (event) => {
    if (event.storageArea === localStorage) {
      callback({
        key: event.key,
        oldValue: event.oldValue,
        newValue: event.newValue,
        url: event.url,
      });
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

/**
 * Initialize storage with cleanup
 */
export const initializeStorage = () => {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  // Cleanup old data on initialization
  cleanupOldData();

  // Log storage info in development
  if (import.meta.env.MODE === 'development') {
    const info = getStorageInfo();
    console.log('💾 Storage initialized:', info);
  }

  return true;
};
