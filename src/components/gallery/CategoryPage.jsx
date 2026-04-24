import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { getAlbumBySlug } from '../../data/galleryData';
import ImageModal from './ImageModal';

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const album = useMemo(() => getAlbumBySlug(category), [category]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [category]);

  if (!album) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf7] px-4 text-center">
        <h2 className="font-[Cormorant_Garamond] text-3xl text-[#1a1a1a] mb-3">
          Album not found
        </h2>
        <p className="text-gray-600 mb-6 font-[Crimson_Text]">
          The album you're looking for doesn't exist.
        </p>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37] text-white hover:bg-[#b8860b] transition"
        >
          <FiArrowLeft /> Back to Gallery
        </Link>
      </section>
    );
  }

  const images = album.images;

  const handleClose = () => setActiveIndex(null);
  const handlePrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const handleNext = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-b from-[#fdfbf7] via-white to-[#fdfbf7] py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <button
          type="button"
          onClick={() => navigate('/gallery')}
          className="inline-flex items-center gap-2 text-[#006400] hover:text-[#d4af37] transition mb-6 font-[Crimson_Text]"
        >
          <FiArrowLeft /> Back to Gallery
        </button>

        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4 font-[Crimson_Text]">
          <Link to="/gallery" className="hover:text-[#d4af37]">Gallery</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1a1a1a]">{album.category}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="font-[Cormorant_Garamond] text-4xl sm:text-5xl font-semibold text-[#1a1a1a]">
            {album.category}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-12 bg-[#d4af37]" />
            <p className="text-gray-600 font-[Crimson_Text]">
              {images.length} {images.length === 1 ? 'photo' : 'photos'}
            </p>
          </div>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 [column-fill:_balance]">
          {images.map((src, i) => (
            <motion.button
              type="button"
              key={`${src}-${i}`}
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              className="mb-4 md:mb-6 block w-full break-inside-avoid overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-500 group focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              aria-label={`Open image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${album.category} ${i + 1}`}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <ImageModal
        images={images}
        currentIndex={activeIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </motion.section>
  );
};

export default CategoryPage;
