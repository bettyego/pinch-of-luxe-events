import { useEffect } from 'react';
import { motion } from 'framer-motion';

const CALENDLY_URL = 'https://calendly.com/pinchofluxeevents/15mins';

const InquiryForm = () => {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#fef9ec] via-white to-white">
      {/* HERO */}
      <section className="pt-28 pb-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl text-[#b8860b] mb-3"
          style={{ fontFamily: 'var(--font-accent)' }}
        >
          let’s plan something beautiful
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="elegant-heading text-4xl md:text-6xl text-[#006400] mb-5"
        >
          Book a <span className="text-[#b8860b] italic">Consultation</span>
        </motion.h1>
        <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
          <span className="h-px w-16 bg-[#d4af37]" />
          <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
          <span className="h-px w-16 bg-[#d4af37]" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="elegant-body text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Pick a time that works for you and we’ll talk through your vision, your venue, and how
          we can bring it all to life.
        </motion.p>
      </section>

      {/* CALENDLY EMBED */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-5xl mx-auto rounded-3xl shadow-xl overflow-hidden bg-white border border-[#f1e7c6]"
        >
          <div
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=b8860b`}
            style={{ minWidth: '320px', height: '720px' }}
          />
        </motion.div>

        <p className="elegant-body text-center text-gray-500 mt-6 text-sm">
          Having trouble loading the calendar?{' '}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#b8860b] underline hover:text-[#006400]"
          >
            Open Calendly in a new tab
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default InquiryForm;