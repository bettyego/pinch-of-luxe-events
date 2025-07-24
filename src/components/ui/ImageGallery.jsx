import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiDownload, 
  FiShare2, FiHeart, FiMaximize2, FiFilter 
} from 'react-icons/fi';
import LazyImage from './LazyImage';

// Gallery categories
const GALLERY_CATEGORIES = {
  all: { label: 'All Events', color: 'bg-gray-500' },
  weddings: { label: 'Weddings', color: 'bg-pink-500' },
  birthdays: { label: 'Birthdays', color: 'bg-blue-500' },
  corporate: { label: 'Corporate', color: 'bg-green-500' },
  baby_showers: { label: 'Baby Showers', color: 'bg-yellow-500' },
  anniversaries: { label: 'Anniversaries', color: 'bg-purple-500' },
  graduations: { label: 'Graduations', color: 'bg-indigo-500' }
};

// Sample gallery data - replace with your actual images
const SAMPLE_IMAGES = [
  { id: 1, src: '/chi1.jpg', category: 'weddings', title: 'Elegant Wedding Setup', description: 'Beautiful balloon arch for wedding ceremony' },
  { id: 2, src: '/chi2.jpg', category: 'birthdays', title: 'Birthday Celebration', description: 'Colorful birthday party decorations' },
  { id: 3, src: '/chi3.jpg', category: 'corporate', title: 'Corporate Event', description: 'Professional corporate event setup' },
  { id: 4, src: '/chi4.jpg', category: 'baby_showers', title: 'Baby Shower Decor', description: 'Sweet baby shower decorations' },
  { id: 5, src: '/chi5.jpg', category: 'weddings', title: 'Wedding Reception', description: 'Stunning wedding reception setup' },
  { id: 6, src: '/chi6.jpg', category: 'anniversaries', title: 'Anniversary Party', description: 'Romantic anniversary celebration' },
  { id: 7, src: '/chi7.jpg', category: 'graduations', title: 'Graduation Party', description: 'Graduation celebration decorations' },
  { id: 8, src: '/chi8.jpg', category: 'birthdays', title: 'Kids Birthday', description: 'Fun kids birthday party setup' },
  { id: 9, src: '/chi9.jpg', category: 'weddings', title: 'Garden Wedding', description: 'Outdoor garden wedding decorations' },
  { id: 10, src: '/chi10.jpg', category: 'corporate', title: 'Product Launch', description: 'Corporate product launch event' }
];

const ImageGallery = ({ 
  images = SAMPLE_IMAGES,
  showCategories = true,
  showLightbox = true,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  className = ""
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filteredImages, setFilteredImages] = useState(images);
  const [favorites, setFavorites] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter images based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage) return;

      switch (e.key) {
        case 'Escape':
          setLightboxImage(null);
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, lightboxIndex]);

  const openLightbox = (image, index) => {
    if (!showLightbox) return;
    setLightboxImage(image);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = useCallback((direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    let newIndex;

    if (direction === 'next') {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }

    setLightboxImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  }, [filteredImages, lightboxImage]);

  const toggleFavorite = (imageId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(imageId)) {
        newFavorites.delete(imageId);
      } else {
        newFavorites.add(imageId);
      }
      return newFavorites;
    });
  };

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const shareImage = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${image.title} - ${window.location.href}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const lightboxVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { scale: 0.8, opacity: 0 }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Category Filter */}
      {showCategories && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="elegant-heading text-2xl text-gray-900">Gallery Categories</h3>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden bg-[#d4af37] text-white p-2 rounded-lg"
            >
              <FiFilter />
            </button>
          </div>

          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap gap-3">
              {Object.entries(GALLERY_CATEGORIES).map(([key, category]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === key
                      ? 'bg-[#d4af37] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${category.color}`}></span>
                  {category.label}
                  <span className="ml-2 text-sm opacity-75">
                    ({selectedCategory === 'all' ? images.length : images.filter(img => img.category === key).length})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`grid gap-4 ${
          columns.sm === 1 ? 'grid-cols-1' : `grid-cols-${columns.sm}`
        } ${
          columns.md ? `md:grid-cols-${columns.md}` : ''
        } ${
          columns.lg ? `lg:grid-cols-${columns.lg}` : ''
        } ${
          columns.xl ? `xl:grid-cols-${columns.xl}` : ''
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              layout
              className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <LazyImage
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="font-semibold text-lg mb-1">{image.title}</h4>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(image.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      favorites.has(image.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <FiHeart className={favorites.has(image.id) ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(image, index);
                    }}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
                  >
                    <FiZoomIn />
                  </button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${GALLERY_CATEGORIES[image.category]?.color || 'bg-gray-500'}`}>
                  {GALLERY_CATEGORIES[image.category]?.label || 'Other'}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 text-6xl mb-4">🖼️</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
          <p className="text-gray-500">Try selecting a different category</p>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && showLightbox && (
          <motion.div
            variants={lightboxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <FiX className="text-3xl" />
            </button>

            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <FiChevronLeft className="text-4xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <FiChevronRight className="text-4xl" />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-4xl max-h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 flex items-center justify-center">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Image Info */}
              <div className="bg-white p-6 rounded-b-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {lightboxImage.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{lightboxImage.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${GALLERY_CATEGORIES[lightboxImage.category]?.color || 'bg-gray-500'}`}>
                        {GALLERY_CATEGORIES[lightboxImage.category]?.label || 'Other'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {lightboxIndex + 1} of {filteredImages.length}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => toggleFavorite(lightboxImage.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        favorites.has(lightboxImage.id)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FiHeart className={favorites.has(lightboxImage.id) ? 'fill-current' : ''} />
                    </button>
                    <button
                      onClick={() => downloadImage(lightboxImage.src, lightboxImage.title)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <FiDownload />
                    </button>
                    <button
                      onClick={() => shareImage(lightboxImage)}
                      className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
