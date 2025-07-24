/**
 * Image optimization utilities for better performance
 */

// Image formats and their quality settings
export const IMAGE_FORMATS = {
  WEBP: 'webp',
  JPEG: 'jpeg',
  PNG: 'png',
  AVIF: 'avif'
};

export const QUALITY_SETTINGS = {
  HIGH: 90,
  MEDIUM: 75,
  LOW: 60
};

// Responsive image breakpoints
export const IMAGE_BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1200,
  large: 1920
};

/**
 * Generate responsive image sources
 * @param {string} imagePath - Base image path
 * @param {string} alt - Alt text for accessibility
 * @returns {object} Image source set configuration
 */
export const generateResponsiveImageSources = (imagePath, alt = '') => {
  const baseName = imagePath.split('.')[0];
  const extension = imagePath.split('.').pop();
  
  return {
    sources: [
      {
        srcSet: `${baseName}-480.webp 480w, ${baseName}-768.webp 768w, ${baseName}-1200.webp 1200w`,
        type: 'image/webp'
      },
      {
        srcSet: `${baseName}-480.${extension} 480w, ${baseName}-768.${extension} 768w, ${baseName}-1200.${extension} 1200w`,
        type: `image/${extension}`
      }
    ],
    img: {
      src: `${baseName}-768.${extension}`,
      alt,
      loading: 'lazy',
      decoding: 'async'
    }
  };
};

/**
 * Lazy loading image component helper
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @returns {object} Image props with lazy loading
 */
export const createLazyImageProps = (src, alt, className = '') => ({
  src,
  alt,
  className,
  loading: 'lazy',
  decoding: 'async',
  onError: (e) => {
    e.target.src = '/pfx.jpg'; // Fallback image
  }
});

/**
 * Preload critical images
 * @param {Array} imagePaths - Array of critical image paths
 */
export const preloadCriticalImages = (imagePaths) => {
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
};

/**
 * Image compression utility (client-side)
 * @param {File} file - Image file to compress
 * @param {number} quality - Compression quality (0-1)
 * @param {number} maxWidth - Maximum width
 * @returns {Promise<Blob>} Compressed image blob
 */
export const compressImage = (file, quality = 0.8, maxWidth = 1200) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Gallery image paths with optimization
export const GALLERY_IMAGES = {
  hero: [
    '/chi43.jpg',
    '/chi1.jpg',
    '/chi2.jpg'
  ],
  weddings: [
    '/w1.jpg', '/w2.jpg', '/w3.jpg', '/w4.jpg', '/w5.jpg',
    '/w6.jpg', '/w7.jpg', '/w8.jpg', '/w9.jpg', '/w10.jpg'
  ],
  events: [
    '/chi4.jpg', '/chi5.jpg', '/chi6.jpg', '/chi7.jpg', '/chi8.jpg',
    '/chi9.jpg', '/chi10.jpg', '/chi11.jpg', '/chi12.jpg', '/chi13.jpg'
  ]
};

export default {
  IMAGE_FORMATS,
  QUALITY_SETTINGS,
  IMAGE_BREAKPOINTS,
  generateResponsiveImageSources,
  createLazyImageProps,
  preloadCriticalImages,
  compressImage,
  GALLERY_IMAGES
};
