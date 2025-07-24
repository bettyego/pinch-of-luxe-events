import React from 'react';

const AboutUs = () => {
  const stats = [
    { number: '500+', label: 'Events Planned', icon: '🎉' },
    { number: '5+', label: 'Years Experience', icon: '⭐' },
    { number: '100%', label: 'Client Satisfaction', icon: '❤️' },
    { number: '50+', label: 'Happy Couples', icon: '💍' }
  ];

  const values = [
    {
      icon: '✨',
      title: 'Excellence',
      description: 'We strive for perfection in every detail, ensuring your event exceeds expectations.'
    },
    {
      icon: '💝',
      title: 'Personalization',
      description: 'Every event is unique. We tailor our services to reflect your personal style and vision.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building lasting relationships through reliability, transparency, and exceptional service.'
    },
    {
      icon: '🎨',
      title: 'Creativity',
      description: 'Innovative designs and fresh ideas that bring your dream celebration to life.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Designer',
      description: 'With over 8 years in luxury event planning, Sarah brings creativity and precision to every celebration.'
    },
    {
      name: 'Emily Chen',
      role: 'Event Coordinator',
      description: 'Emily ensures flawless execution with her attention to detail and exceptional organizational skills.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Floral Designer',
      description: 'Michael creates stunning floral arrangements that perfectly complement our balloon artistry.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef9ec] to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 mt-12 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#d4af37] animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-[#006400] animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-[#d4af37] animate-pulse"></div>
          <div className="absolute bottom-40 right-1/3 w-16 h-16 rounded-full bg-[#006400] animate-bounce"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#006400] via-[#d4af37] to-[#006400] mb-6 font-heading">
              About Pinch of Luxe Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where dreams meet reality and every celebration becomes a masterpiece of elegance and joy.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-[#d4af37] transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-[#006400] mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#006400] leading-tight">
                Our Story of 
                <span className="text-[#d4af37]"> Passion & Purpose</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded with a vision to transform ordinary moments into extraordinary memories, 
                  Pinch of Luxe Events began as a dream to bring luxury and elegance to every celebration.
                </p>
                <p>
                  What started as a passion for creating beautiful balloon arrangements has evolved into 
                  a full-service luxury event planning company. We believe that every milestone deserves 
                  to be celebrated with style, sophistication, and a touch of magic.
                </p>
                <p>
                  Today, we're proud to be the trusted choice for discerning clients who value quality, 
                  creativity, and flawless execution. From intimate gatherings to grand celebrations, 
                  we bring the same level of dedication and artistry to every event.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#006400] to-[#228B22] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
                <p className="text-lg opacity-90">
                  "To create not just events, but experiences that touch hearts, create connections, 
                  and leave you with memories that last a lifetime."
                </p>
                <div className="mt-4 text-right">
                  <span className="text-[#d4af37] font-semibold">- The Pinch of Luxe Team</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#d4af37] to-[#b8860b] rounded-3xl p-8 transform rotate-3 shadow-2xl">
                <img 
                  src="/chi.jpg" 
                  alt="Pinch of Luxe Events" 
                  className="w-full h-96 object-cover rounded-2xl transform -rotate-3"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-[#d4af37]">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-[#006400]">Award Winning</div>
                <div className="text-sm text-gray-600">Event Planning</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#fef9ec] to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#006400] mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every event we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#d4af37] h-full transform group-hover:scale-105 transition-all duration-300">
                  <div className="text-5xl mb-6 text-center">{value.icon}</div>
                  <h3 className="text-xl font-bold text-[#006400] mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#006400] mb-6">
              Meet Our Creative Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented individuals who bring your vision to life with passion and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] p-2 transform group-hover:scale-105 transition-all duration-300">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-6xl">
                      👤
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg border border-[#d4af37]">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#006400] mb-2">{member.name}</h3>
                <p className="text-[#d4af37] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#006400] via-[#228B22] to-[#32CD32] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Magic Together?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's turn your vision into an unforgettable celebration that reflects your unique style and personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/inquiryform" 
              className="bg-[#d4af37] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8860b] transition-colors duration-300 transform hover:scale-105"
            >
              Start Planning Your Event
            </a>
            <a 
              href="/contact" 
              className="bg-white text-[#006400] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
