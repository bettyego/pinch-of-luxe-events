import React from 'react';
import { motion } from 'framer-motion';

const paragraphVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4,
      duration: 1.2,
      ease: 'easeOut',
    },
  }),
};

const Owner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef9ec] to-white">
      <section className="py-20 px-6 mt-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Animated Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="/chi23.jpg"
            alt="Chinyere Onuma Chukukere"
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
          />
        </motion.div>

        {/* Animated Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl font-['Cormorant_Garamond'] font-light text-green-900 mb-4 tracking-wider"
            variants={paragraphVariants}
            custom={0}
          >
            Meet the Founder
          </motion.h2>

          <motion.p
            className="text-gray-800 mb-4 text-lg font-['Crimson_Text'] font-light tracking-wide leading-relaxed"
            variants={paragraphVariants}
            custom={1}
          >
            <strong className="text-[#006400]">Chinyere Onuma Chukukere</strong> is the heart and creative mind behind Pinch of Luxe Events.
            A passionate designer and visionary, Chinyere turned her love for art, color, and celebration into a successful
            luxury event planning business that has brought joy to countless celebrations.
          </motion.p>

          <motion.p
            className="text-gray-800 mb-4 text-lg"
            variants={paragraphVariants}
            custom={2}
          >
            Married and a proud mother of three, she balances family and entrepreneurship with grace. Based in the USA, her
            work reflects a blend of elegance, creativity, and cultural richness.
          </motion.p>

          <motion.p
            className="text-gray-800 mb-4 text-lg"
            variants={paragraphVariants}
            custom={3}
          >
            Since launching Pinch of Luxe Events <strong className="text-[#d4af37]">over 5 years ago</strong>, Chinyere has built a reputation for excellence,
            transforming ordinary spaces into unforgettable experiences. Her commitment to detail and customer satisfaction
            has made her a beloved name in the luxury event planning industry.
          </motion.p>

          <motion.p
            className="text-gold-700 font-semibold italic text-lg"
            variants={paragraphVariants}
            custom={4}
          >
            “Every celebration deserves magic — and we’re here to create it.”
          </motion.p>
        </motion.div>
        </div>
      </section>

    {/* Achievements Section */}
    <section className="py-20 px-6 bg-gradient-to-r from-[#fef9ec] to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-light text-[#006400] mb-6 tracking-wider">
            Achievements & Milestones
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-['Crimson_Text'] font-light tracking-wide leading-relaxed">
            A testament to dedication, creativity, and the pursuit of excellence in luxury event planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Events Created', icon: '🎉' },
            { number: '5+', label: 'Years Experience', icon: '⭐' },
            { number: '100%', label: 'Client Satisfaction', icon: '❤️' },
            { number: '50+', label: 'Happy Couples', icon: '💍' }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#d4af37] transform group-hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">{achievement.icon}</div>
                <div className="text-4xl font-bold text-[#006400] mb-2">{achievement.number}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Values & Philosophy Section */}
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-light text-[#006400] mb-6 tracking-wider">
            Core Values & Philosophy
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Crimson_Text'] font-light tracking-wide leading-relaxed">
            The principles that guide every decision and inspire every creation at Pinch of Luxe Events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Creativity',
              description: 'Every event is a canvas for artistic expression and innovation.',
              icon: '🎨'
            },
            {
              title: 'Excellence',
              description: 'Commitment to the highest standards in every detail.',
              icon: '✨'
            },
            {
              title: 'Family Values',
              description: 'Balancing business success with family priorities.',
              icon: '👨‍👩‍👧‍👦'
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#d4af37] h-full transform group-hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-6 text-center">{value.icon}</div>
                <h4 className="text-2xl font-bold text-[#006400] mb-4 text-center">{value.title}</h4>
                <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="py-20 px-6 bg-gradient-to-r from-[#006400] via-[#228B22] to-[#32CD32] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-light mb-6 tracking-wider">
            Ready to Create Magic Together?
          </h3>
          <p className="text-xl mb-8 opacity-90 font-['Crimson_Text'] font-light tracking-wide leading-relaxed">
            Let Chinyere and her team bring your vision to life with a perfect pinch of luxury and elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/inquiryform"
              className="bg-[#d4af37] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8860b] transition-colors duration-300 transform hover:scale-105"
            >
              Start Your Journey
            </a>
            <a
              href="/gallery"
              className="bg-white text-[#006400] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              View Our Creations
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
  );
};

export default Owner;
