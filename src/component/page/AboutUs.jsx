import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGem, FaHeart, FaStar } from 'react-icons/fa';
import { b } from 'framer-motion/client';

const videos = [
  { src: '/Zuri .mp4', title: 'Zuri is One' },
  { src: '/ChichiBirthdayDecor.mp4', title: "Chidinma's 35th" },
  { src: '/Braveboy1.mp4', title: 'Brave Boy Celebration' },
  { src: '/Chandie.mp4', title: 'Chandie Girls' },
  { src: '/vid.mp4', title: 'Blooming into Bad & Boujee' },
  { src: '/vid1.mp4', title: 'Aisha Braveboy Inauguration: Prince George’s County Executive' },
  { src: '/vid2.mp4', title: 'First Royal Ball' },
   { src: '/His.mp4', title: 'His Royal Majesty is One' },
     { src: '/georgette and fredrick .MP4', title: 'Georgette and Frederick' },
   { src: '/ZION1.MP4', title: 'Zion Birthday' },
    { src: '/lead.mp4', title: 'The woman who bravely leads' },
   
  
  
];

const pillars = [
  { icon: <FaGem />, title: 'Elegance', text: 'Timeless, luxurious design — refined down to the smallest detail.' },
  { icon: <FaHeart />, title: 'Intention', text: 'Every element is chosen with purpose, to match your vision.' },
  { icon: <FaStar />, title: 'Personal', text: 'Experiences tailored to your story, your guests, your moment.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AboutUs = () => {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fef9ec] via-white to-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl text-[#b8860b] mb-4"
            style={{ fontFamily: 'var(--font-accent)' }}
          >
            our story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="elegant-heading text-5xl md:text-7xl text-[#006400] mb-6"
          >
            About <span className="text-[#b8860b] italic">Pinch of Luxe</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden="true">
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
            Every celebration tells a story — we exist to make yours unforgettable.
          </motion.p>
        </div>
      </section>

      {/* MEET CHICHI */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="lg:col-span-2 relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#d4af37] rounded-3xl hidden md:block" aria-hidden="true" />
            <img
              src="/own12.jpeg"
              alt="ChiChi, founder of Pinch of Luxe Events"
              className="relative w-full h-[520px] object-cover rounded-3xl shadow-2xl"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-[#b8860b] text-xl" style={{ fontFamily: 'var(--font-accent)' }}>
              meet the founder
            </p>
            <h2 className="elegant-heading text-4xl md:text-5xl text-[#006400]">
              Meet <span className="text-[#b8860b]">ChiChi</span>
            </h2>
            <p className="elegant-body text-lg text-gray-700">
              <span className="font-semibold text-[#006400]">Chinyere Onuma Chukukere</span>{' '}
              — fondly known as ChiChi — is the heart and creative mind behind Pinch of Luxe Events.
              A passionate designer and visionary, ChiChi turned her love for art, color, and
              celebration into a luxury event planning &amp; design business.
            </p>
            <p className="elegant-body text-lg text-gray-700">
              Married and a proud mother of three, she balances family and entrepreneurship with
              grace. Based in the DMV, her work reflects a blend of elegance, creativity, and
              cultural richness.
            </p>
            <p className="elegant-body text-lg text-gray-700">
              Since launching Pinch of Luxe Events in 2020, ChiChi has built a reputation for
              excellence — transforming ordinary spaces into experiences that feel personal,
              elegant, and timeless.
            </p>
            <blockquote className="border-l-4 border-[#d4af37] pl-6 py-2 italic text-[#006400] text-xl">
              “We don’t just decorate spaces… we create moments you’ll never forget.”
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-[#fef9ec]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#b8860b] text-xl mb-2" style={{ fontFamily: 'var(--font-accent)' }}>
            what we stand for
          </p>
          <h2 className="elegant-heading text-4xl md:text-5xl text-[#006400] mb-4">
            The Pinch of Luxe Way
          </h2>
          <div className="flex items-center justify-center gap-3 mb-14" aria-hidden="true">
            <span className="h-px w-12 bg-[#d4af37]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span className="h-px w-12 bg-[#d4af37]" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-[#f1e7c6]"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#fef9ec] text-[#b8860b] flex items-center justify-center text-2xl">
                  {p.icon}
                </div>
                <h3 className="elegant-heading text-2xl text-[#006400] mb-3">{p.title}</h3>
                <p className="elegant-body text-gray-600 leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO GALLERY */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#b8860b] text-xl mb-2" style={{ fontFamily: 'var(--font-accent)' }}>
            moments in motion
          </p>
          <h2 className="elegant-heading text-4xl md:text-5xl text-[#006400] mb-4">
            Bringing Events to Life
          </h2>
          <p className="elegant-body text-gray-600 max-w-2xl mx-auto mb-12">
            A closer look at the celebrations, the design, and the details behind every event.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videos.map((v, i) => (
              <motion.figure
                key={v.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow bg-black"
              >
                <video
                  src={v.src}
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full aspect-[4/5] object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-left p-4 pointer-events-none">
                  <span className="elegant-body text-sm uppercase tracking-widest text-[#d4af37]">
                    Pinch of Luxe
                  </span>
                  <p className="elegant-heading text-lg">{v.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-r from-[#006400] via-[#0a6a0a] to-[#228B22] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl text-[#d4af37] mb-3" style={{ fontFamily: 'var(--font-accent)' }}>
            let’s plan something beautiful
          </p>
          <h2 className="elegant-heading text-4xl md:text-5xl mb-6">
            Ready to Create Your Moment?
          </h2>
          <p className="elegant-body text-lg mb-10 opacity-90">
            Whether it’s an intimate gathering or a grand celebration, we’re here to bring your
            vision to life with elegance and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/inquiryform"
              className="elegant-button bg-[#d4af37] text-[#006400] px-8 py-3 rounded-full hover:bg-white transition-colors"
            >
              Book Your Event
            </Link>
            <Link
              to="/contact"
              className="elegant-button border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#006400] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;