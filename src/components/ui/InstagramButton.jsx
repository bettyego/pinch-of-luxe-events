import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

// ✅ INSTAGRAM CONFIG
const INSTAGRAM_URL = "https://instagram.com/pinchofluxeevents";

const InstagramButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openInstagram = () => {
    window.open(INSTAGRAM_URL, '_blank');
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <button
        onClick={openInstagram}
        className="w-14 h-14 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center relative"
        aria-label="Visit our Instagram"
      >
        <FaInstagram className="text-2xl" />

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20"></div>
      </button>
    </motion.div>
  );
};

export default InstagramButton;
