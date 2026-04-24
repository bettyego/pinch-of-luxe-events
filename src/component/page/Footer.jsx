import { Link } from 'react-router-dom';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Now', path: '/inquiryform' }
  ];

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/pinchofLuxeevents' },
    { name: 'Facebook', url: 'https://facebook.com/pinchofLuxeevents' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#006400] via-[#228B22] to-[#32CD32] text-white overflow-hidden">
      
      {/* Subtle Overlay for Luxury Feel */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif text-[#b8860b] mb-4">
              Pinch of Luxe Events
            </h3>

            <p className="text-white/80 leading-relaxed mb-6">
              We create elegant, unforgettable experiences tailored to your vision.
              Every detail is designed with intention, beauty, and sophistication.
            </p>

            <p className="italic text-sm text-white/70">
              Creating moments that last a lifetime.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#b8860b] mb-4">
              Explore
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-[#b8860b] transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-lg font-semibold text-[#b8860b] mb-4">
              Get In Touch
            </h4>

            <div className="space-y-3 text-white/80">
              <p>
                <a href="tel:+13019063939" className="hover:text-[#b8860b] transition">
                  +1 (301) 906-3939
                </a>
              </p>
              <p>
                <a href="tel:+12407081721" className="hover:text-[#b8860b] transition">
                  +1 (240) 708-1721
                </a>
              </p>
              <p>
                <a href="mailto:pinchofluxeevents@gmail.com" className="hover:text-[#b8860b] transition">
                  pinchofluxeevents@gmail.com
                </a>
              </p>
            </div>

            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 px-4 py-2 text-sm hover:bg-[#b8860b] hover:border-[#b8860b] transition"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">

          <p>
            © {currentYear} Pinch of Luxe Events. All rights reserved.
          </p>

          <p className="mt-4 md:mt-0">
            Based in the DMV · Serving DC, Maryland &amp; Virginia
          </p>
        </div>

        {/* Developer Signature */}
        <div className="text-center mt-6 text-xs text-white/50">
          Designed by <span className="text-[#b8860b]">BettyTech</span>
        </div>

      </div>
    </footer>
  );
};

export default FooterComponent;