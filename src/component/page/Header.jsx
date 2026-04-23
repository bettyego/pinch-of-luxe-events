import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from '../../utils/touchUtils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle scroll
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

       {/* LOGO */}
<div className="flex items-center h-14 md:h-16">
  <img
    src="/lg12.png"
    alt="Pinchofluxeevents Logo"
    className="h-full w-auto object-contain"
  />
</div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-5 lg:gap-8 text-base lg:text-lg text-green-900 font-medium">
            <Link to="/" className="hover:text-[#b8860b] transition">Home</Link>
            <Link to="/about" className="hover:text-[#b8860b] transition">About Us</Link>
            <Link to="/inquiryform" className="hover:text-[#b8860b] transition">Inquiry</Link>
            <Link to="/gallery" className="hover:text-[#b8860b] transition">Gallery</Link>
            <Link to="/contact" className="hover:text-[#b8860b] transition">Contact</Link>
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/admin"
              className="text-xs text-gray-500 hover:text-[#b8860b] transition"
              title="Admin Access"
            >
            </Link>

            <Link
              to="/inquiryform"
              className="bg-[#d4af37] text-white px-5 py-2 rounded-full hover:bg-green-800 transition duration-300 text-sm sm:text-base"
            >
              Book Us Now
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-green-900 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-green-900/95 px-4 py-6 space-y-4 text-white text-base font-medium">

          <Link to="/" onClick={toggleMobileMenu} className="block hover:text-[#b8860b]">Home</Link>
          <Link to="/about" onClick={toggleMobileMenu} className="block hover:text-[#b8860b]">About</Link>
          <Link to="/inquiryform" onClick={toggleMobileMenu} className="block hover:text-[#b8860b]">Inquiry</Link>
          <Link to="/gallery" onClick={toggleMobileMenu} className="block hover:text-[#b8860b]">Gallery</Link>
          <Link to="/contact" onClick={toggleMobileMenu} className="block hover:text-[#b8860b]">Contact</Link>

          <Link
            to="/inquiryform"
            onClick={toggleMobileMenu}
            className="inline-block mt-4 bg-[#b8860b] px-4 py-2 rounded-full text-white hover:bg-green-800 transition"
          >
            Book Us Now
          </Link>

        </nav>
      )}
    </header>
  );
};

export default Header;