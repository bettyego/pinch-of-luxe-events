import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FiArrowRight, FiPhone, FiMail, FiAward } from 'react-icons/fi';

const slideStyles = {
  title: 'font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6 tracking-tight leading-tight',
  subtitle: 'font-serif text-lg sm:text-xl md:text-2xl text-[#d4af37] mb-3 sm:mb-4 tracking-wide',
  text: 'font-sans text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl leading-relaxed',
  button: 'inline-flex items-center space-x-2 bg-[#d4af37] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium tracking-wide hover:bg-[#b8860b] transition-all duration-300 shadow-lg hover:shadow-xl',
  secondaryButton: 'inline-flex items-center space-x-2 border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300',
};

const slides = [
  {
    image: 'public/IMG_4418.jpeg',
    subtitle: 'Premier Event Planning',
    title: 'Exceptional Events, Extraordinary Experiences',
    text: 'Elegant, thoughtfully designed events tailored to your vision. We bring beauty, style, and seamless execution to every celebration.',
    align: 'center',
  },
  {
    image: '/w15.jpg',
    subtitle: 'Wedding Excellence',
    title: 'Timeless Wedding Celebrations',
    text: 'Romantic, refined, and uniquely yours — we craft weddings that feel as beautiful as they look.',
    align: 'left',
  },
  {
    image: '/w3.jpg',
    subtitle: 'Corporate Events',
    title: 'Professional Event Experiences',
    text: 'From intimate gatherings to grand launches, we deliver polished events that leave lasting impressions.',
    align: 'right',
  },
  {
    image: '/chi41.jpg',
    subtitle: 'Luxury Celebrations',
    title: 'Bespoke Event Design',
    text: 'Every detail matters. We create immersive, elegant celebrations designed to reflect your unique style.',
    align: 'center',
  },
];

const Hero = React.memo(() => {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((slideIndex) => {
    setIndex(slideIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const getAlignment = useCallback((align) => {
    if (align === 'left') return 'items-start text-left';
    if (align === 'right') return 'items-end text-right';
    return 'items-center text-center';
  }, []);

  const currentSlide = useMemo(() => slides[index], [index]);

  return (
    <section {...handlers} className="relative min-h-screen h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        >
          <div className="absolute inset-0 bg-black/30" />

          <div
            className={`relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-20 lg:px-32 ${getAlignment(
              currentSlide.align
            )}`}
          >
            {/* Subtitle */}
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={slideStyles.subtitle}
            >
              {currentSlide.subtitle}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={slideStyles.title}
            >
              {currentSlide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={slideStyles.text}
            >
              {currentSlide.text}
            </motion.p>

            {/* Signature Line */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="italic text-white/80 text-sm sm:text-base mb-6"
            >
              Creating unforgettable moments with elegance, detail, and passion.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/inquiryform">
                <button className={slideStyles.button}>
                  <span>Book a Consultation</span>
                  <FiArrowRight />
                </button>
              </Link>

              <Link to="/gallery">
                <button className={slideStyles.secondaryButton}>
                  <span>View Our Work</span>
                </button>
              </Link>
            </motion.div>

            {/* Contact (no address) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 flex flex-wrap gap-4 text-white/80 text-sm"
            >
              <div className="flex items-center space-x-2">
                <FiPhone className="text-[#d4af37]" />
                <span>+1 (301) 906-3939</span>
              </div>

              <div className="flex items-center space-x-2">
                <FiMail className="text-[#d4af37]" />
                <span>pinchofluxeevents@gmail.com</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-[#d4af37]' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Badge */}
      <div className="absolute top-6 right-6 z-30 hidden md:block">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg">
          <div className="flex items-center space-x-2 text-white text-sm">
            <FiAward className="text-[#d4af37]" />
            <span>Luxury Event Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;