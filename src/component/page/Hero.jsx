import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiAward, FiUsers, FiCalendar, FiStar } from 'react-icons/fi';

const slideStyles = {
  title: 'font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6 tracking-tight leading-tight',
  subtitle: 'font-serif text-lg sm:text-xl md:text-2xl text-[#d4af37] mb-3 sm:mb-4 tracking-wide',
  text: 'font-sans text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl leading-relaxed',
  button: 'inline-flex items-center space-x-2 sm:space-x-3 bg-[#d4af37] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium tracking-wide hover:bg-[#b8860b] transition-all duration-300 shadow-lg hover:shadow-xl',
  secondaryButton: 'inline-flex items-center space-x-2 border-2 border-white text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-300',
};

const slides = [
  {
    image: '/chi43.jpg',
    subtitle: 'Premier Event Planning',
    title: 'Exceptional Events, Extraordinary Experiences',
    text: 'We specialize in creating sophisticated celebrations that reflect your unique vision and exceed your highest expectations. From intimate gatherings to grand celebrations, our expertise ensures every detail is perfectly executed.',
    align: 'center',
    stats: { years: '10+', events: '500+', clients: '98%' }
  },
  {
    image: '/w15.jpg',
    subtitle: 'Wedding Excellence',
    title: 'Timeless Wedding Celebrations',
    text: 'Transform your special day into an unforgettable celebration with our comprehensive wedding planning services. We bring together elegance, sophistication, and personal touches to create the wedding of your dreams.',
    align: 'left',
    stats: { years: '10+', events: '200+', clients: '100%' }
  },
  {
    image: '/w3.jpg',
    subtitle: 'Corporate Events',
    title: 'Professional Event Management',
    text: 'Elevate your corporate gatherings with our professional event management services. From product launches to annual galas, we deliver seamless experiences that enhance your brand and engage your audience.',
    align: 'right',
    stats: { years: '10+', events: '150+', clients: '95%' }
  },
  {
    image: '/chi41.jpg',
    subtitle: 'Luxury Celebrations',
    title: 'Bespoke Event Design & Planning',
    text: 'Our commitment to excellence and attention to detail ensures that every celebration we create is a masterpiece. We work closely with you to bring your vision to life with unparalleled sophistication.',
    align: 'center',
    stats: { years: '10+', events: '300+', clients: '99%' }
  },
  {
    image: '/chi27.jpg',
    subtitle: 'Birthday Celebrations',
    title: 'Memorable Birthday Experiences',
    text: 'From milestone birthdays to intimate celebrations, we create magical moments that honor your special day. Our creative designs and attention to detail ensure every birthday becomes an unforgettable experience.',
    align: 'left',
    stats: { years: '10+', events: '180+', clients: '97%' }
  },
  {
    image: '/chi33.jpg',
    subtitle: 'Elegant Decorations',
    title: 'Stunning Visual Transformations',
    text: 'Watch ordinary spaces transform into extraordinary venues with our signature decoration style. We combine luxury elements with creative flair to create breathtaking environments for your special occasions.',
    align: 'right',
    stats: { years: '10+', events: '400+', clients: '96%' }
  },
  {
    image: '/w10.jpg',
    subtitle: 'Dream Weddings',
    title: 'Fairytale Wedding Moments',
    text: 'Every bride deserves a fairytale wedding. Our expert team crafts romantic, elegant celebrations that capture the essence of your love story and create memories that will last a lifetime.',
    align: 'center',
    stats: { years: '10+', events: '250+', clients: '100%' }
  }
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
    const interval = setInterval(nextSlide, 8000); // Slower transition for professional feel
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
          {/* Lighter overlay for better image visibility */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

          <div
            className={`relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-20 lg:px-32 pt-20 sm:pt-24 md:pt-16 lg:pt-0 ${getAlignment(
              currentSlide.align
            )}`}
          >
            {/* Subtitle */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <span className={slideStyles.subtitle}>
                {currentSlide.subtitle}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`${slideStyles.title} drop-shadow-2xl`}
            >
              {currentSlide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`${slideStyles.text} drop-shadow-lg`}
            >
              {currentSlide.text}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8"
            >
              <div className="flex items-center space-x-2 text-white">
                <FiAward className="text-[#d4af37] text-lg sm:text-xl" />
                <span className="font-medium text-sm sm:text-base">{currentSlide.stats.years} Years Experience</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <FiCalendar className="text-[#d4af37] text-lg sm:text-xl" />
                <span className="font-medium text-sm sm:text-base">{currentSlide.stats.events} Events Completed</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <FiStar className="text-[#d4af37] text-lg sm:text-xl" />
                <span className="font-medium text-sm sm:text-base">{currentSlide.stats.clients} Client Satisfaction</span>
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link to="/inquiryform" className="w-full sm:w-auto">
                <button className={`${slideStyles.button} w-full sm:w-auto justify-center`}>
                  <span>Start Planning Your Event</span>
                  <FiArrowRight className="text-base sm:text-lg" />
                </button>
              </Link>

              <Link to="/gallery" className="w-full sm:w-auto">
                <button className={`${slideStyles.secondaryButton} w-full sm:w-auto justify-center`}>
                  <span>View Our Portfolio</span>
                </button>
              </Link>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6 text-white/80 text-xs sm:text-sm"
            >
              <div className="flex items-center space-x-2">
                <FiPhone className="text-[#d4af37] text-sm sm:text-base" />
                <span>+1 (301) 906-3939</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMail className="text-[#d4af37] text-sm sm:text-base" />
                <span className="break-all sm:break-normal">info@pinchofLuxeevents.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="text-[#d4af37] text-sm sm:text-base" />
                <span>Maryland, USA</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Professional Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center space-x-2 sm:space-x-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              i === index
                ? 'bg-[#d4af37] scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Elegant Side Navigation */}
      <div className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-30 hidden sm:block">
        <button
          onClick={prevSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-30 hidden sm:block">
        <button
          onClick={nextSlide}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Professional Badge */}
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-30 hidden md:block">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 sm:px-4 py-2">
          <div className="flex items-center space-x-2 text-white text-xs sm:text-sm">
            <FiAward className="text-[#d4af37] text-sm sm:text-base" />
            <span className="font-medium">Award-Winning Event Planners</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;

// Professional Business Credentials Section
export const BusinessCredentials = () => {
  const credentials = [
    {
      icon: FiAward,
      title: "Award-Winning Excellence",
      description: "Recognized for outstanding event planning and design innovation"
    },
    {
      icon: FiUsers,
      title: "Expert Team",
      description: "Certified event planners with decades of combined experience"
    },
    {
      icon: FiStar,
      title: "Premium Service",
      description: "White-glove service ensuring every detail exceeds expectations"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
            Why Choose Pinch of Luxe Events
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            We bring unparalleled expertise, creativity, and dedication to every event we plan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {credentials.map((credential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-4">
                <credential.icon className="text-white text-2xl" />
              </div>
              <h3 className="font-serif text-xl text-gray-900 mb-3">{credential.title}</h3>
              <p className="font-sans text-gray-600">{credential.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
