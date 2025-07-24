import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-md w-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.h1 
            className="text-9xl font-bold text-[#d4af37] mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          
          {/* Main Message */}
          <motion.h2 
            className="text-2xl font-semibold text-green-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Oops! Page Not Found
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The page you're looking for seems to have floated away like a balloon! 
            Don't worry, we'll help you find your way back to our amazing events.
          </motion.p>
          
          {/* Balloon Icon */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <svg 
              className="mx-auto h-16 w-16 text-[#d4af37]" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/"
              className="block w-full bg-[#d4af37] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition duration-300 shadow-lg"
            >
              Go Back Home
            </Link>
            
            <Link
              to="/gallery"
              className="block w-full bg-white text-[#d4af37] px-6 py-3 rounded-full font-semibold border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-white transition duration-300"
            >
              View Our Gallery
            </Link>
            
            <Link
              to="/contact"
              className="block w-full bg-transparent text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
          
          {/* Helpful Links */}
          <motion.div 
            className="mt-8 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="text-sm text-gray-500 mb-3">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/about" className="text-green-600 hover:text-green-800 transition">About Us</Link>
              <Link to="/services" className="text-green-600 hover:text-green-800 transition">Services</Link>
              <Link to="/inquiryform" className="text-green-600 hover:text-green-800 transition">Book Event</Link>
              <Link to="/review" className="text-green-600 hover:text-green-800 transition">Reviews</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
