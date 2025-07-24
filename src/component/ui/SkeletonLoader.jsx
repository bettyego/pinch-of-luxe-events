import React from 'react';

const SkeletonLoader = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'text' 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4',
    title: 'h-6',
    image: 'h-48',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24 rounded-md',
    card: 'h-64'
  };

  return (
    <div 
      className={`${baseClasses} ${width} ${variantClasses[variant]} ${className}`}
    />
  );
};

// Gallery Skeleton Component
export const GallerySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
        <SkeletonLoader variant="image" className="w-full" />
        <div className="p-4 space-y-2">
          <SkeletonLoader variant="title" width="w-3/4" />
          <SkeletonLoader variant="text" width="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// Form Skeleton Component
export const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonLoader height="h-12" />
      <SkeletonLoader height="h-12" />
    </div>
    <SkeletonLoader height="h-12" />
    <SkeletonLoader height="h-32" />
    <SkeletonLoader variant="button" className="mx-auto" />
  </div>
);

// Hero Skeleton Component
export const HeroSkeleton = () => (
  <div className="h-screen bg-gray-200 animate-pulse flex items-center justify-center">
    <div className="text-center space-y-4">
      <SkeletonLoader width="w-96" height="h-12" className="mx-auto" />
      <SkeletonLoader width="w-64" height="h-6" className="mx-auto" />
      <SkeletonLoader variant="button" className="mx-auto mt-6" />
    </div>
  </div>
);

export default SkeletonLoader;
