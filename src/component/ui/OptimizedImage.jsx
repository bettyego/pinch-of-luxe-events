import React, { useState, useRef, useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  placeholder = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // For now, just use the original image since we don't have responsive variants
  const generateSrcSet = (baseSrc) => {
    return baseSrc; // Return original image
  };

  // Check if WebP version exists, otherwise skip
  const generateWebPSrc = (baseSrc) => {
    if (!baseSrc) return '';
    const extension = baseSrc.split('.').pop();
    const webpSrc = baseSrc.replace(`.${extension}`, '.webp');
    // Only return WebP if it's likely to exist (for now, skip WebP)
    return null; // Disable WebP for now
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (import.meta.env.MODE === 'development') {
      console.log('✅ Image loaded:', src);
    }
  };

  const handleError = (e) => {
    setError(true);
    setIsLoaded(true);
    if (import.meta.env.MODE === 'development') {
      console.error('❌ Image failed to load:', src, e);
    }
  };

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <svg 
          className="w-8 h-8 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {/* Skeleton loader while loading */}
      {placeholder && !isLoaded && (
        <div className="absolute inset-0">
          <SkeletonLoader 
            variant="image" 
            className="w-full h-full" 
          />
        </div>
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
