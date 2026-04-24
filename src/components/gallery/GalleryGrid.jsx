import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { galleryAlbums, getAllImages, ALL_SLUG } from '../../data/galleryData';

const GalleryGrid = () => {
  const albums = useMemo(() => {
    const allAlbum = {
      category: 'All Events',
      slug: ALL_SLUG,
      coverImage: galleryAlbums[0]?.coverImage,
      images: getAllImages(),
    };
    return [allAlbum, ...galleryAlbums];
  }, []);

  return (
    <section
      aria-label="Gallery albums"
      className="min-h-screen bg-gradient-to-b from-[#fdfbf7] via-white to-[#fdfbf7] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-[Dancing_Script] text-[#d4af37] text-2xl sm:text-3xl mb-2">
            Our Story in Pictures
          </p>
          <h1 className="font-[Cormorant_Garamond] text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1a1a1a] mb-4">
            The Gallery
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xl">✦</span>
            <span className="h-px w-12 bg-[#d4af37]" />
          </div>
          <p className="font-[Crimson_Text] text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A curated collection of moments we've had the honor to design.
            Step into each album to relive the elegance, joy and detail of every event.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {albums.map((album, i) => (
            <CategoryCard key={album.slug} album={album} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryGrid;
