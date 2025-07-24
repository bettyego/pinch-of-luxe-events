import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, FiUsers, FiMapPin, FiClock, FiDollarSign, 
  FiCheck, FiInfo, FiDownload, FiShare2 
} from 'react-icons/fi';
import { useToast } from '../../hooks/useToast.jsx';

// Enhanced pricing configuration for US market
const PRICING_CONFIG = {
  eventTypes: {
    'Wedding': {
      base: 5000,
      multiplier: 1.8,
      description: 'Complete wedding decoration and planning',
      popular: true
    },
    'Birthday Party': {
      base: 2000,
      multiplier: 1.2,
      description: 'Birthday celebration setup',
      popular: true
    },
    'Corporate Event': {
      base: 6000,
      multiplier: 2.0,
      description: 'Professional corporate event planning',
      popular: false
    },
    'Baby Shower': {
      base: 1500,
      multiplier: 1.0,
      description: 'Baby shower decorations and setup',
      popular: true
    },
    'Anniversary': {
      base: 3000,
      multiplier: 1.4,
      description: 'Anniversary celebration planning',
      popular: false
    },
    'Graduation': {
      base: 1800,
      multiplier: 1.1,
      description: 'Graduation party setup',
      popular: false
    },
    'Engagement': {
      base: 3500,
      multiplier: 1.6,
      description: 'Engagement party planning',
      popular: true
    },
    'Housewarming': {
      base: 2200,
      multiplier: 1.3,
      description: 'Housewarming party setup',
      popular: false
    }
  },
  guestRanges: {
    '1-25': { multiplier: 0.8, label: '1-25 guests (Intimate)' },
    '26-50': { multiplier: 1.0, label: '26-50 guests (Small)' },
    '51-100': { multiplier: 1.4, label: '51-100 guests (Medium)' },
    '101-200': { multiplier: 1.8, label: '101-200 guests (Large)' },
    '201-300': { multiplier: 2.3, label: '201-300 guests (Very Large)' },
    '300+': { multiplier: 2.8, label: '300+ guests (Grand)' }
  },
  services: {
    'Balloon Decorations': { price: 30000, category: 'decoration', essential: true },
    'Floral Arrangements': { price: 45000, category: 'decoration', essential: true },
    'Backdrop Design': { price: 25000, category: 'decoration', essential: false },
    'Table Settings': { price: 20000, category: 'decoration', essential: false },
    'Lighting Setup': { price: 40000, category: 'technical', essential: false },
    'Sound System': { price: 35000, category: 'technical', essential: false },
    'Photography': { price: 100000, category: 'media', essential: false },
    'Videography': { price: 120000, category: 'media', essential: false },
    'Catering Coordination': { price: 80000, category: 'coordination', essential: false },
    'Event Coordination': { price: 150000, category: 'coordination', essential: true },
    'Cleanup Service': { price: 25000, category: 'service', essential: false },
    'Security Coordination': { price: 60000, category: 'service', essential: false }
  },
  locations: {
    'Lagos': { multiplier: 1.3, label: 'Lagos (Premium)' },
    'Abuja': { multiplier: 1.2, label: 'Abuja (High)' },
    'Port Harcourt': { multiplier: 1.1, label: 'Port Harcourt (Standard)' },
    'Kano': { multiplier: 0.9, label: 'Kano (Economy)' },
    'Ibadan': { multiplier: 0.95, label: 'Ibadan (Standard)' },
    'Enugu': { multiplier: 1.0, label: 'Enugu (Standard)' },
    'Kaduna': { multiplier: 0.9, label: 'Kaduna (Economy)' },
    'Other': { multiplier: 1.0, label: 'Other Location' }
  },
  durations: {
    '2-4 hours': { multiplier: 0.8, label: '2-4 hours (Half day)' },
    '4-6 hours': { multiplier: 1.0, label: '4-6 hours (Standard)' },
    '6-8 hours': { multiplier: 1.3, label: '6-8 hours (Extended)' },
    'Full day': { multiplier: 1.6, label: 'Full day (8+ hours)' },
    'Multiple days': { multiplier: 2.5, label: 'Multiple days' }
  },
  seasons: {
    'peak': { multiplier: 1.2, months: [11, 12, 1, 2] }, // Nov-Feb (wedding season)
    'high': { multiplier: 1.1, months: [3, 4, 10] }, // Mar, Apr, Oct
    'standard': { multiplier: 1.0, months: [5, 6, 7, 8, 9] } // May-Sep
  }
};

const QuoteCalculator = ({ 
  onQuoteGenerated,
  showSaveOptions = true,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    eventType: '',
    guestCount: '',
    location: '',
    duration: '',
    eventDate: '',
    services: []
  });

  const [quote, setQuote] = useState({
    subtotal: 0,
    locationAdjustment: 0,
    seasonalAdjustment: 0,
    total: 0,
    breakdown: {}
  });

  const [showBreakdown, setShowBreakdown] = useState(false);
  const { success, info } = useToast();

  // Calculate quote whenever form data changes
  useEffect(() => {
    calculateQuote();
  }, [formData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getSeasonMultiplier = (dateString) => {
    if (!dateString) return 1;
    
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    
    for (const [season, config] of Object.entries(PRICING_CONFIG.seasons)) {
      if (config.months.includes(month)) {
        return config.multiplier;
      }
    }
    return 1;
  };

  const calculateQuote = () => {
    if (!formData.eventType || !formData.guestCount || !formData.location) {
      setQuote({ subtotal: 0, locationAdjustment: 0, seasonalAdjustment: 0, total: 0, breakdown: {} });
      return;
    }

    const eventConfig = PRICING_CONFIG.eventTypes[formData.eventType];
    const guestConfig = PRICING_CONFIG.guestRanges[formData.guestCount];
    const locationConfig = PRICING_CONFIG.locations[formData.location];
    const durationConfig = PRICING_CONFIG.durations[formData.duration] || { multiplier: 1 };
    const seasonMultiplier = getSeasonMultiplier(formData.eventDate);

    // Base cost calculation
    let baseCost = eventConfig.base * eventConfig.multiplier * guestConfig.multiplier * durationConfig.multiplier;

    // Service costs
    const serviceCosts = formData.services.reduce((total, service) => {
      return total + (PRICING_CONFIG.services[service]?.price || 0);
    }, 0);

    const subtotal = baseCost + serviceCosts;
    const locationAdjustment = subtotal * (locationConfig.multiplier - 1);
    const seasonalAdjustment = subtotal * (seasonMultiplier - 1);
    const total = subtotal + locationAdjustment + seasonalAdjustment;

    // Breakdown
    const breakdown = {
      baseEvent: baseCost,
      services: serviceCosts,
      location: locationAdjustment,
      seasonal: seasonalAdjustment
    };

    setQuote({
      subtotal: Math.round(subtotal),
      locationAdjustment: Math.round(locationAdjustment),
      seasonalAdjustment: Math.round(seasonalAdjustment),
      total: Math.round(total),
      breakdown
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, value]
          : prev.services.filter(service => service !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveQuote = () => {
    const quoteData = {
      ...formData,
      quote,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('savedQuote', JSON.stringify(quoteData));
    success('Quote saved successfully!');
    onQuoteGenerated?.(quoteData);
  };

  const handleShareQuote = async () => {
    const shareText = `Event Quote from Pinch of Luxe Events\n\nEvent: ${formData.eventType}\nGuests: ${formData.guestCount}\nLocation: ${formData.location}\nEstimated Cost: ${formatCurrency(quote.total)}\n\nGet your quote at: ${window.location.href}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Event Quote - Pinch of Luxe Events',
          text: shareText
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      info('Quote details copied to clipboard!');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const servicesByCategory = Object.entries(PRICING_CONFIG.services).reduce((acc, [service, config]) => {
    if (!acc[config.category]) acc[config.category] = [];
    acc[config.category].push({ name: service, ...config });
    return acc;
  }, {});

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white p-6">
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="elegant-heading text-3xl mb-2">Event Quote Calculator</h2>
          <p className="elegant-body opacity-90">Get an instant estimate for your dream event</p>
        </motion.div>
      </div>

      <div className="p-6 space-y-6">
        {/* Event Type Selection */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Event Type *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(PRICING_CONFIG.eventTypes).map(([type, config]) => (
              <label
                key={type}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                  formData.eventType === type
                    ? 'border-[#d4af37] bg-[#d4af37]/10'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="eventType"
                  value={type}
                  checked={formData.eventType === type}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="font-medium text-gray-900">{type}</div>
                  <div className="text-xs text-gray-500 mt-1">{config.description}</div>
                  {config.popular && (
                    <div className="absolute -top-2 -right-2 bg-[#d4af37] text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                {formData.eventType === type && (
                  <motion.div
                    layoutId="selectedEvent"
                    className="absolute inset-0 border-2 border-[#d4af37] rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </label>
            ))}
          </div>
        </motion.div>

        {/* Guest Count and Location */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Guests *
            </label>
            <div className="relative">
              <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
              >
                <option value="">Select guest count</option>
                {Object.entries(PRICING_CONFIG.guestRanges).map(([range, config]) => (
                  <option key={range} value={range}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
              >
                <option value="">Select location</option>
                {Object.entries(PRICING_CONFIG.locations).map(([location, config]) => (
                  <option key={location} value={location}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Duration and Date */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Duration
            </label>
            <div className="relative">
              <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
              >
                <option value="">Select duration</option>
                {Object.entries(PRICING_CONFIG.durations).map(([duration, config]) => (
                  <option key={duration} value={duration}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Services Selection */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Additional Services
          </label>
          <div className="space-y-4">
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 capitalize">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map(service => (
                    <label key={service.name} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={service.name}
                        checked={formData.services.includes(service.name)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-[#d4af37] border-gray-300 rounded focus:ring-[#d4af37]"
                      />
                      <div className="flex-1">
                        <span className="text-sm text-gray-700">{service.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatCurrency(service.price)}
                        </span>
                        {service.essential && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">
                            Recommended
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote Display */}
        <AnimatePresence>
          {quote.total > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white rounded-xl p-6"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Estimated Total</h3>
                <div className="text-4xl font-bold mb-4">{formatCurrency(quote.total)}</div>
                
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-sm underline opacity-90 hover:opacity-100 transition-opacity"
                >
                  {showBreakdown ? 'Hide' : 'Show'} Price Breakdown
                </button>

                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/20 text-left space-y-2"
                    >
                      <div className="flex justify-between">
                        <span>Base Event Cost:</span>
                        <span>{formatCurrency(quote.breakdown.baseEvent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Additional Services:</span>
                        <span>{formatCurrency(quote.breakdown.services)}</span>
                      </div>
                      {quote.locationAdjustment !== 0 && (
                        <div className="flex justify-between">
                          <span>Location Adjustment:</span>
                          <span>{formatCurrency(quote.locationAdjustment)}</span>
                        </div>
                      )}
                      {quote.seasonalAdjustment !== 0 && (
                        <div className="flex justify-between">
                          <span>Seasonal Adjustment:</span>
                          <span>{formatCurrency(quote.seasonalAdjustment)}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {showSaveOptions && (
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={handleSaveQuote}
                      className="flex-1 bg-white text-[#d4af37] py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FiDownload className="text-lg" />
                      <span>Save Quote</span>
                    </button>
                    <button
                      onClick={handleShareQuote}
                      className="flex-1 bg-white/20 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FiShare2 className="text-lg" />
                      <span>Share</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center text-sm opacity-90">
                <FiInfo className="inline mr-1" />
                This is a preliminary estimate. Final quote may vary based on specific requirements.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuoteCalculator;
