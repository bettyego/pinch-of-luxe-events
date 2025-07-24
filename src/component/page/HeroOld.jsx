import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiAward, FiUsers, FiCalendar } from 'react-icons/fi';

const slideStyles = {
  title: 'font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-tight',
  subtitle: 'font-serif text-xl md:text-2xl text-[#d4af37] mb-4 tracking-wide',
  text: 'font-sans text-lg md:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed',
  button: 'inline-flex items-center space-x-3 bg-[#d4af37] text-white px-8 py-4 font-medium tracking-wide hover:bg-[#b8860b] transition-all duration-300 shadow-lg hover:shadow-xl',
  secondaryButton: 'inline-flex items-center space-x-2 border-2 border-white text-white px-6 py-3 font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300',
};

const slides = [
  {
    image: '/chi43.jpg',
    title: <>Celebrate <span className="elegant-accent">in Style</span></>,
    text: 'Transform your events with balloon magic, elegance, and flair.',
    align: 'center',
  },
  {
    image: '/w15.jpg',
    title: 'Elegant Wedding Dreams',
    text: 'Creating magical moments with luxurious wedding decor that takes your breath away.',
    align: 'left',
  },
  {
    image: '/w3.jpg',
    title: 'Timeless Wedding Backdrops',
    text: 'Stunning designs that create the perfect setting for your dream wedding celebrations.',
    align: 'right',
  },
  {
    image: '/chi41.jpg',
    title: 'Let’s Make Memories',
    text: 'Your event deserves unforgettable moments — we deliver them.',
    align: 'center',
  },
  {
    image: '/w.jpg',
    title: 'Let’s Make Magic',
    text: 'Your event deserves unforgettable magic touch — we are always ready.',
    align: 'center',
  },
  {
    image: '/chi10.jpg',
    title: 'Unmatched Creativity',
    text: 'Our team is dedicated to bringing unique, creative ideas to life for your special day.',
    align: 'left',
  },
  {
    image: '/chi11.jpg',
    title: 'Exquisite Designs',
    text: 'Every arrangement is carefully crafted with luxury and elegance in mind.',
    align: 'right',
  },
  {
    image: '/chi14.jpg',
    title: 'Your Dream Event Awaits',
    text: 'From balloons to decor, we create an atmosphere that matches your dream event.',
    align: 'center',
  },
  {
    image: '/chi22.jpg',
    title: 'Personalized Touch',
    text: 'We add the personal touch that makes every moment at your event stand out.',
    align: 'left',
  },
  {
    image: '/chi27.jpg',
    title: 'Timeless Elegance',
    text: 'Our designs are created with timeless beauty to ensure your event is stunning now and forever.',
    align: 'right',
  },
  {
    image: '/chi28.jpg',
    title: 'Every Moment Counts',
    text: 'We focus on the smallest details that create lasting memories for you and your guests.',
    align: 'center',
  },
  {
    image: '/chi33.jpg',
    title: 'Transforming Spaces',
    text: 'From ordinary to extraordinary — we elevate every space to match your event’s vibe.',
    align: 'left',
  },
  {
    image: '/chi34.jpg',
    title: 'A Vision Come to Life',
    text: 'Watch your vision unfold through our hands-on, detail-oriented event designs.',
    align: 'right',
  },
];

const Hero = React.memo(() => {
  const [index, setIndex] = useState(0);

  // Memoize navigation functions
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
    const interval = setInterval(nextSlide, 6000);
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

  // Memoize current slide data
  const currentSlide = useMemo(() => slides[index], [index]);

  return (
    <section {...handlers} className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
        >
          {/* Multiple overlays for better text contrast */}
          <div className="absolute inset-0 bg-black opacity-20" /> {/* Lighter base overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" /> {/* Lighter gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" /> {/* Lighter additional gradient */}

          <div
            className={`relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-20 ${getAlignment(
              currentSlide.align
            )}`}
          >
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`${slideStyles.title} drop-shadow-2xl font-heading text-shadow-lg`}
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`${slideStyles.text} drop-shadow-2xl text-shadow-md font-medium`}
            >
              {currentSlide.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6"
            >
              <Link to="/inquiryform">
                <button className={slideStyles.button}>
                  Because Luxury Is in the Details
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-white' : 'bg-white/40'
            } transition duration-300`}
          />
        ))}
      </div>
    </section>
  );
});

export default Hero;
