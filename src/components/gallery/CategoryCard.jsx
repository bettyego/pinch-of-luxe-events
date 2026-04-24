import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoryCard = ({ album, index = 0 }) => {
  const count = album.images?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: 'easeOut' }}
    >
      <Link
        to={`/gallery/${album.slug}`}
        aria-label={`View ${album.category} album`}
        className="group relative block aspect-square overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2"
      >
        <img
          src={album.coverImage}
          alt={album.category}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/10 transition-all duration-500" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3 className="font-[Cormorant_Garamond] text-white text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide drop-shadow-lg">
            {album.category}
          </h3>
          <span className="mt-2 inline-block h-px w-10 bg-[#d4af37] transition-all duration-500 group-hover:w-20" />
          <p className="mt-3 text-white/85 text-xs sm:text-sm uppercase tracking-[0.2em] font-[Crimson_Text]">
            {count} {count === 1 ? 'Photo' : 'Photos'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
