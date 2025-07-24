// Footer Component - Cache Busted Version 2.0
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Now', path: '/inquiryform' }
  ];

  const services = [
    'Wedding Decorations',
    'Birthday Parties',
    'Baby Showers',
    'Corporate Events',
    'Balloon Arches',
    'Floral Arrangements'
  ];

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/pinchofLuxeevents', label: 'Facebook' },
    { name: 'Instagram', url: 'https://instagram.com/pinchofLuxeevents', label: 'Instagram' },
    { name: 'Twitter', url: 'https://twitter.com/pinchofLuxeevents', label: 'Twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/pinchofLuxeevents', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#006400] via-[#228B22] to-[#32CD32] text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#d4af37] animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-white animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-[#d4af37] animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-8 h-8 rounded-full bg-white animate-bounce"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-1/4 text-4xl text-[#d4af37]">⭐</div>
        <div className="absolute bottom-32 left-1/3 text-3xl text-white">🎁</div>
      </div>

      {/* Wave Pattern */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="rgba(255,255,255,0.1)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#d4af37]">Pinch of Luxe Events</h3>
                <p className="text-sm text-green-100">Events & Celebrations</p>
              </div>
            </div>
            
            <p className="text-green-100 leading-relaxed">
              Creating magical moments and unforgettable celebrations with our premium balloon decorations, 
              floral arrangements, and comprehensive event planning services.
            </p>
            
            <div className="flex items-center space-x-2 text-[#d4af37]">
              <span className="animate-pulse">❤️</span>
              <span className="text-sm font-medium">Making Dreams Come True Since 2020</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-green-100 hover:text-[#d4af37] transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-[#d4af37] rounded-full group-hover:scale-125 transition-transform duration-300"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-2 inline-block">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-green-100 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-[#d4af37] border-b-2 border-[#d4af37] pb-2 inline-block">
              Get In Touch
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-[#d4af37] mt-1 flex-shrink-0">📍</span>
                <div>
                  <p className="text-green-100">123 Event Street</p>
                  <p className="text-green-100">Your City, State 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[#d4af37]">📞</span>
                <a href="tel:+13019063939" className="text-green-100 hover:text-[#d4af37] transition-colors">
                  +1 (301) 906-3939
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-[#d4af37]">✉️</span>
                <a href="mailto:info@pinchofLuxeevents.com" className="text-green-100 hover:text-[#d4af37] transition-colors">
                  info@pinchofLuxeevents.com
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-[#d4af37] mt-1">🕒</span>
                <div>
                  <p className="text-green-100">Mon-Fri: 9AM-6PM</p>
                  <p className="text-green-100">Sat-Sun: 10AM-4PM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h5 className="text-[#d4af37] font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="px-3 py-2 bg-white/20 rounded-full text-sm text-white hover:bg-[#d4af37] transition-all duration-300 transform hover:scale-110"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/10 rounded-2xl p-8 mb-8 backdrop-blur-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-[#d4af37] mb-4">
              🎉 Stay Updated with Our Latest Events!
            </h4>
            <p className="text-green-100 mb-6">
              Subscribe to our newsletter for exclusive offers, event inspiration, and the latest trends in party planning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              />
              <button className="px-8 py-3 bg-[#d4af37] text-white rounded-full font-semibold hover:bg-[#b8860b] transition-colors duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-green-100">
                © {currentYear} Pinch of Luxe Events. All rights reserved.
              </p>
              <p className="text-sm text-green-200 mt-1">
                Made with <span className="inline text-red-400 animate-pulse">❤️</span> for unforgettable celebrations
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-green-100 hover:text-[#d4af37] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-green-100 hover:text-[#d4af37] transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-green-100 hover:text-[#d4af37] transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
         {/* Developer Signature */}
          <div className="border-t border-gray-700 pt-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>Designed and developed by</span>
              <span className="text-blue-400 font-semibold hover:text-blue-300 transition cursor-pointer">
                Bettytech
              </span>
              <span className="text-red-400">❤️</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Full Stack Developer & UI/UX Designer
            </div>
          </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
