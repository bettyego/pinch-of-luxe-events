import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from '../../utils/touchUtils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 10);
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('header')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white/60 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
  
          <div className="flex items-center gap-2">
            <img src="/pfx.jpg" alt="Pinchofluxeevents Logo" className="h-10 w-auto object-contain" />
          </div>

  
          <nav className="hidden md:flex gap-5 lg:gap-8 text-base lg:text-lg text-green-900 font-medium">
            <Link to="/" className="hover:text-[#b8860b] transition">Home</Link>
            <Link to="/about" className="hover:text-[#b8860b] transition">About Us</Link>
            <Link to="/services" className="hover:text-[#b8860b] transition">Services</Link>
            <Link to="/inquiryform" className="hover:text-[#b8860b] transition">Inquiry</Link>
            <Link to="/review" className="hover:text-[#b8860b] transition">Reviews</Link>
            <Link to="/gallery" className="hover:text-[#b8860b] transition">Gallery</Link>
            <Link to="/contact" className="hover:text-[#b8860b] transition">Contact</Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/admin"
              className="text-xs text-gray-500 hover:text-[#b8860b] transition"
              title="Admin Access"
            >
              🔐
            </Link>
            <Link
              to="/inquiryform"
              className=" bg-[#d4af37] text-white px-5 py-2 rounded-full hover:bg-green-800 transition duration-300 text-sm sm:text-base"
            >
              Book Us Now
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-green-900 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden bg-green-900/95 backdrop-blur-sm px-4 py-6 space-y-4 text-white text-base font-medium animate-slide-down"
          aria-label="Mobile navigation"
          style={{
            animation: 'slideDown 0.3s ease-out'
          }}
        >
          {['Home', 'About', 'Services', 'Inquiry', 'Reviews', 'Gallery', 'Contact'].map((page) => (
            <Link
              key={page}
              to={`/${page === 'Home' ? '' : page.toLowerCase()}`}
              onClick={toggleMobileMenu}
              className="block hover:text-[#b8860b] transition focus:outline-none focus:ring-2 focus:ring-[#b8860b] rounded px-2 py-1"
              aria-label={`Navigate to ${page} page`}
            >
              {page}
            </Link>
          ))}

          <Link
            to="/inquiryform"
            onClick={toggleMobileMenu}
            className="inline-block mt-4 bg-[#b8860b] px-4 py-2 rounded-full text-white hover:bg-green-800 transition focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Book an event inquiry"
          >
            Book Us Now
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
