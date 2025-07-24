import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, 
  FiUsers, FiClock, FiDollarSign, FiMessageSquare 
} from 'react-icons/fi';
import { useToast } from '../../hooks/useToast.jsx';
import emailjs from '@emailjs/browser';

// Pricing configuration in Nigerian Naira
const PRICING_CONFIG = {
  eventTypes: {
    'Wedding': { base: 150000, multiplier: 1.5 },
    'Birthday Party': { base: 80000, multiplier: 1.2 },
    'Corporate Event': { base: 200000, multiplier: 1.8 },
    'Baby Shower': { base: 60000, multiplier: 1.0 },
    'Anniversary': { base: 100000, multiplier: 1.3 },
    'Graduation': { base: 70000, multiplier: 1.1 },
    'Other': { base: 90000, multiplier: 1.2 }
  },
  guestRanges: {
    '1-50': 1.0,
    '51-100': 1.3,
    '101-200': 1.6,
    '201-300': 2.0,
    '300+': 2.5
  },
  services: {
    'Balloon Decorations': 25000,
    'Floral Arrangements': 35000,
    'Photography': 80000,
    'Catering': 120000,
    'DJ/Music': 60000,
    'Lighting': 40000,
    'Venue Decoration': 50000,
    'Event Planning': 100000
  },
  locations: {
    'Lagos': 1.2,
    'Abuja': 1.1,
    'Port Harcourt': 1.0,
    'Kano': 0.9,
    'Ibadan': 0.95,
    'Other': 1.0
  }
};

const InquiryForm = ({ onSubmitSuccess, className = "" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    duration: '',
    services: [],
    budget: '',
    message: '',
    preferredContact: 'email'
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error, loading, removeToast } = useToast();

  // Calculate estimated cost
  useEffect(() => {
    calculateEstimate();
  }, [formData.eventType, formData.guestCount, formData.services, formData.location]);

  const calculateEstimate = () => {
    if (!formData.eventType || !formData.guestCount) {
      setEstimatedCost(0);
      return;
    }

    const eventConfig = PRICING_CONFIG.eventTypes[formData.eventType];
    const guestMultiplier = PRICING_CONFIG.guestRanges[formData.guestCount] || 1;
    const locationMultiplier = PRICING_CONFIG.locations[formData.location] || 1;

    let baseCost = eventConfig.base * eventConfig.multiplier * guestMultiplier * locationMultiplier;

    // Add service costs
    const serviceCosts = formData.services.reduce((total, service) => {
      return total + (PRICING_CONFIG.services[service] || 0);
    }, 0);

    const totalCost = baseCost + serviceCosts;
    setEstimatedCost(Math.round(totalCost));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'services') {
        setFormData(prev => ({
          ...prev,
          services: checked 
            ? [...prev.services, value]
            : prev.services.filter(service => service !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.eventType) newErrors.eventType = 'Event type is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
    if (!formData.guestCount) newErrors.guestCount = 'Guest count is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    // Date validation
    if (formData.eventDate) {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.eventDate = 'Event date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = loading('Sending your inquiry...');

    try {
      const emailData = {
        ...formData,
        services: formData.services.join(', '),
        estimated_cost: formatCurrency(estimatedCost),
        to_name: 'Pinch of Luxe Events'
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_INQUIRY_TEMPLATE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      removeToast(loadingToastId);
      success('Inquiry sent successfully! We\'ll contact you within 24 hours with a detailed quote.');
      
      // Reset form
      setFormData({
        name: '', email: '', phone: '', eventType: '', eventDate: '',
        guestCount: '', location: '', duration: '', services: [],
        budget: '', message: '', preferredContact: 'email'
      });
      
      onSubmitSuccess?.();

    } catch (err) {
      removeToast(loadingToastId);
      error('Failed to send inquiry. Please try again.');
      console.error('EmailJS Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}
    >
      <div className="text-center mb-8">
        <h2 className="elegant-heading text-3xl text-gray-900 mb-2">
          Event Inquiry & Quote
        </h2>
        <p className="elegant-body text-gray-600">
          Get a personalized quote for your dream event
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Your full name"
                required
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="your@email.com"
                required
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="+234 xxx xxx xxxx"
                required
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Type *
            </label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">Select event type</option>
              {Object.keys(PRICING_CONFIG.eventTypes).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date *
            </label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.eventDate ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Count *
            </label>
            <div className="relative">
              <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="guestCount"
                value={formData.guestCount}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.guestCount ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Select range</option>
                {Object.keys(PRICING_CONFIG.guestRanges).map(range => (
                  <option key={range} value={range}>{range} guests</option>
                ))}
              </select>
            </div>
            {errors.guestCount && <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>}
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
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Select location</option>
                {Object.keys(PRICING_CONFIG.locations).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Services Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Services Required
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(PRICING_CONFIG.services).map(service => (
              <label key={service} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#d4af37] border-gray-300 rounded focus:ring-[#d4af37]"
                />
                <span className="text-sm text-gray-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration and Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <option value="2-4 hours">2-4 hours</option>
                <option value="4-6 hours">4-6 hours</option>
                <option value="6-8 hours">6-8 hours</option>
                <option value="Full day">Full day</option>
                <option value="Multiple days">Multiple days</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <div className="relative">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
              >
                <option value="">Select budget range</option>
                <option value="₦50,000 - ₦100,000">₦50,000 - ₦100,000</option>
                <option value="₦100,000 - ₦200,000">₦100,000 - ₦200,000</option>
                <option value="₦200,000 - ₦500,000">₦200,000 - ₦500,000</option>
                <option value="₦500,000 - ₦1,000,000">₦500,000 - ₦1,000,000</option>
                <option value="₦1,000,000+">₦1,000,000+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estimated Cost Display */}
        {estimatedCost > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white p-6 rounded-lg"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Estimated Cost</h3>
              <p className="text-3xl font-bold">{formatCurrency(estimatedCost)}</p>
              <p className="text-sm opacity-90 mt-2">
                *This is a preliminary estimate. Final quote may vary based on specific requirements.
              </p>
            </div>
          </motion.div>
        )}

        {/* Additional Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent resize-none"
              placeholder="Tell us more about your vision, special requirements, or any questions you have..."
            />
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                checked={formData.preferredContact === 'email'}
                onChange={handleInputChange}
                className="w-4 h-4 text-[#d4af37] border-gray-300 focus:ring-[#d4af37]"
              />
              <span className="ml-2 text-sm text-gray-700">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                checked={formData.preferredContact === 'phone'}
                onChange={handleInputChange}
                className="w-4 h-4 text-[#d4af37] border-gray-300 focus:ring-[#d4af37]"
              />
              <span className="ml-2 text-sm text-gray-700">Phone</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="preferredContact"
                value="whatsapp"
                checked={formData.preferredContact === 'whatsapp'}
                onChange={handleInputChange}
                className="w-4 h-4 text-[#d4af37] border-gray-300 focus:ring-[#d4af37]"
              />
              <span className="ml-2 text-sm text-gray-700">WhatsApp</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full bg-[#d4af37] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#b8860b] transition-all duration-200 elegant-button ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry & Get Quote'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default InquiryForm;
