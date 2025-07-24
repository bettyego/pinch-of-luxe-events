import React, { useState } from 'react';

const styleClasses = {
  mainTitle: "elegant-heading text-4xl md:text-5xl text-center mb-4",
  subtitle: "elegant-subheading text-xl md:text-2xl text-center mb-8",
  serviceTitle: "elegant-heading text-2xl md:text-3xl mb-2",
  serviceDescription: "elegant-body text-gray-600 mb-6",
  feature: "elegant-body text-gray-700",
  price: "elegant-subheading text-xl text-[#d4af37]",
  button: "elegant-button bg-[#d4af37] text-white px-6 py-3 rounded-full hover:bg-[#b8860b] transition-all duration-300"
};

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: <>Wedding <span className="elegant-accent">Celebrations</span></>,
      subtitle: 'Your Perfect Day, Perfectly Planned',
      description: 'Transform your wedding into a fairytale with our luxury balloon installations, elegant floral arrangements, and comprehensive planning services.',
      features: ['Balloon Arches & Garlands', 'Bridal Table Styling', 'Ceremony Backdrops', 'Reception Centerpieces', 'Photo Booth Setup'],
      price: 'Starting from $2,500',
      icon: '💍',
      color: 'from-pink-400 to-rose-500',
      image: '/w.jpg'
    },
    {
      title: 'Birthday Parties',
      subtitle: 'Celebrate Another Year of Joy',
      description: 'Make birthdays unforgettable with custom themes, vibrant balloon displays, and magical decorations that bring smiles to all ages.',
      features: ['Custom Theme Design', 'Balloon Sculptures', 'Party Favors', 'Dessert Table Setup', 'Entertainment Coordination'],
      price: 'Starting from $800',
      icon: '🎂',
      color: 'from-purple-400 to-indigo-500',
      image: '/chi2.jpg'
    },
    {
      title: 'Baby Showers',
      subtitle: 'Welcome Little Miracles',
      description: 'Celebrate new beginnings with soft, elegant decorations that create the perfect atmosphere for welcoming your bundle of joy.',
      features: ['Gender Reveal Setups', 'Pastel Balloon Displays', 'Gift Table Styling', 'Photo Opportunities', 'Keepsake Creation'],
      price: 'Starting from $600',
      icon: '👶',
      color: 'from-blue-400 to-cyan-500',
      image: '/chi32.jpg'
    },
    {
      title: 'Corporate Events',
      subtitle: 'Professional Excellence',
      description: 'Elevate your corporate gatherings with sophisticated decorations that reflect your brand and impress your clients.',
      features: ['Brand Color Coordination', 'Professional Backdrops', 'Networking Areas', 'Award Ceremony Setup', 'Product Launch Displays'],
      price: 'Starting from $1,200',
      icon: '🏢',
      color: 'from-emerald-400 to-teal-500',
      image: '/MORI2202_8Zw.jpg'
    },
    {
      title: 'Special Occasions',
      subtitle: 'Every Moment Matters',
      description: 'From anniversaries to graduations, we create beautiful celebrations for all of life\'s special moments.',
      features: ['Anniversary Celebrations', 'Graduation Parties', 'Holiday Decorations', 'Retirement Parties', 'Custom Celebrations'],
      price: 'Starting from $500',
      icon: '🎉',
      color: 'from-amber-400 to-orange-500',
      image: '/chi7.jpg'
    }
  ];

  const packages = [
    {
      name: 'Essential',
      price: '$299',
      description: 'Perfect for intimate gatherings',
      features: ['Basic balloon arrangement', 'Color coordination', 'Setup & cleanup', '2-hour service'],
      popular: false
    },
    {
      name: 'Premium',
      price: '$799',
      description: 'Our most popular package',
      features: ['Custom balloon garland', 'Backdrop setup', 'Table centerpieces', 'Photo props', 'Setup & cleanup', '4-hour service'],
      popular: true
    },
    {
      name: 'Luxury',
      price: '$1,499',
      description: 'The ultimate celebration experience',
      features: ['Full event styling', 'Multiple balloon installations', 'Floral arrangements', 'Custom signage', 'Dedicated coordinator', 'Full-day service'],
      popular: false
    }
  ];

  const addOns = [
    { name: 'Photo Booth Props', price: '$150', icon: '📸' },
    { name: 'LED Lighting', price: '$200', icon: '💡' },
    { name: 'Custom Signage', price: '$100', icon: '📝' },
    { name: 'Floral Arrangements', price: '$300', icon: '🌸' },
    { name: 'Dessert Table Styling', price: '$250', icon: '🧁' },
    { name: 'Extra Setup Time', price: '$100/hr', icon: '⏰' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef9ec] to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className={styleClasses.mainTitle}>Luxury Event Services</h1>
        <p className={styleClasses.subtitle}>Creating Unforgettable Celebrations with Style and Grace</p>
        
        {/* Services Showcase */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Service Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeService === index
                      ? 'bg-[#006400] text-white shadow-lg'
                      : 'bg-white text-[#006400] border border-[#006400] hover:bg-[#006400] hover:text-white'
                  }`}
                >
                  <span className="mr-2">{service.icon}</span>
                  {service.title}
                </button>
              ))}
            </div>

            {/* Active Service Display */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className={styleClasses.serviceTitle}>
                    {services[activeService].title}
                  </h2>
                  <h3 className="text-2xl text-[#d4af37] font-semibold mb-6">
                    {services[activeService].subtitle}
                  </h3>
                  <p className={styleClasses.serviceDescription}>
                    {services[activeService].description}
                  </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#d4af37]">
                  <h4 className="text-xl font-bold text-[#006400] mb-6">What's Included:</h4>
                  <ul className="space-y-3">
                    {services[activeService].features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-6 h-6 bg-[#006400] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm">✓</span>
                        </span>
                        <span className={styleClasses.feature}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className={styleClasses.price}>
                        {services[activeService].price}
                      </span>
                      <a 
                        href="/inquiryform"
                        className={styleClasses.button}
                      >
                        Get Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className={`bg-gradient-to-br ${services[activeService].color} rounded-3xl p-8 transform rotate-2 shadow-2xl`}>
                  <img 
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    className="w-full h-96 object-cover rounded-2xl transform -rotate-2"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-[#d4af37]">
                  <div className="text-4xl mb-2">{services[activeService].icon}</div>
                  <div className="font-bold text-[#006400]">Premium</div>
                  <div className="text-sm text-gray-600">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-[#fef9ec] to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#006400] mb-6">
                Choose Your Package
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select the perfect package for your celebration, or let us create a custom solution just for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div key={index} className={`relative bg-white rounded-3xl shadow-xl border-2 transform hover:scale-105 transition-all duration-300 ${
                  pkg.popular ? 'border-[#d4af37] scale-105' : 'border-gray-200'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#d4af37] text-white px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#006400] mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <div className="text-4xl font-bold text-[#d4af37] mb-8">{pkg.price}</div>
                    
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <span className="w-5 h-5 bg-[#006400] rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-xs">✓</span>
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href="/inquiryform"
                      className={`w-full block text-center py-3 rounded-full font-semibold transition-colors duration-300 ${
                        pkg.popular 
                          ? 'bg-[#d4af37] text-white hover:bg-[#b8860b]' 
                          : 'bg-white text-[#006400] border border-[#006400] hover:bg-[#006400] hover:text-white'
                      }`}
                    >
                      Choose Package
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#006400] mb-6">
                Enhance Your Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Add these special touches to make your celebration even more memorable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {addOns.map((addon, index) => (
                <div key={index} className="bg-white rounded-3xl shadow-xl p-6 border border-[#d4af37] transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{addon.icon}</div>
                    <h3 className="text-xl font-bold text-[#006400] mb-2">{addon.name}</h3>
                    <p className="text-2xl font-bold text-[#d4af37] mb-4">{addon.price}</p>
                    <button className="bg-[#006400] text-white px-6 py-2 rounded-full hover:bg-[#004d00] transition-colors duration-300">
                      Add to Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-[#006400] via-[#228B22] to-[#32CD32] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your vision and create a custom package that brings your dreams to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/inquiryform" 
                className="bg-[#d4af37] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b8860b] transition-colors duration-300 transform hover:scale-105"
              >
                Get Custom Quote
              </a>
              <a 
                href="/gallery" 
                className="bg-white text-[#006400] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                View Our Work
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
