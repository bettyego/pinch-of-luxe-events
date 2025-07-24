import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiPhone, FiMessageSquare, FiCalendar, FiSend } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast.jsx';
import emailjs from '@emailjs/browser';

// Form validation rules
const validateForm = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Message validation
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  // Event date validation (if provided)
  if (formData.eventDate) {
    const selectedDate = new Date(formData.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.eventDate = 'Event date cannot be in the past';
    }
  }
  
  return errors;
};

// Input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

const ContactForm = ({ 
  title = "Get In Touch",
  subtitle = "Let's discuss your dream event",
  showEventDate = true,
  onSubmitSuccess,
  className = ""
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventDate: '',
    eventType: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error, loading, removeToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      error('Please correct the highlighted fields');
      return;
    }
    
    setIsSubmitting(true);
    const loadingToastId = loading('Sending your message...');
    
    try {
      // Prepare email data
      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        event_date: formData.eventDate,
        event_type: formData.eventType,
        to_name: 'Pinch of Luxe Events',
        reply_to: formData.email
      };
      
      // Send email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        emailData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      removeToast(loadingToastId);
      success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        eventDate: '',
        eventType: ''
      });
      
      onSubmitSuccess?.();
      
    } catch (err) {
      removeToast(loadingToastId);
      error('Failed to send message. Please try again or contact us directly.');
      console.error('EmailJS Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const eventTypes = [
    'Wedding',
    'Birthday Party',
    'Corporate Event',
    'Baby Shower',
    'Anniversary',
    'Graduation',
    'Other'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}
    >
      <div className="text-center mb-8">
        <h2 className="elegant-heading text-3xl text-gray-900 mb-2">
          {title}
        </h2>
        <p className="elegant-body text-gray-600">
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div variants={inputVariants} whileFocus="focus" className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] 
                focus:border-transparent transition-all duration-200 elegant-body
                ${errors.name ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Enter your full name"
              required
            />
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div variants={inputVariants} whileFocus="focus" className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] 
                focus:border-transparent transition-all duration-200 elegant-body
                ${errors.email ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Enter your email address"
              required
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        {/* Phone Field */}
        <motion.div variants={inputVariants} whileFocus="focus" className="relative">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] 
                focus:border-transparent transition-all duration-200 elegant-body
                ${errors.phone ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Enter your phone number"
              required
            />
          </div>
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.phone}
            </motion.p>
          )}
        </motion.div>

        {/* Event Date and Type (if enabled) */}
        {showEventDate && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Date */}
            <motion.div variants={inputVariants} whileFocus="focus" className="relative">
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`
                    w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] 
                    focus:border-transparent transition-all duration-200 elegant-body
                    ${errors.eventDate ? 'border-red-500' : 'border-gray-300'}
                  `}
                />
              </div>
              {errors.eventDate && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.eventDate}
                </motion.p>
              )}
            </motion.div>

            {/* Event Type */}
            <motion.div variants={inputVariants} whileFocus="focus" className="relative">
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent transition-all duration-200 elegant-body"
              >
                <option value="">Select event type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </motion.div>
          </div>
        )}

        {/* Message Field */}
        <motion.div variants={inputVariants} whileFocus="focus" className="relative">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#d4af37] 
                focus:border-transparent transition-all duration-200 elegant-body resize-none
                ${errors.message ? 'border-red-500' : 'border-gray-300'}
              `}
              placeholder="Tell us about your event and how we can help..."
              required
            />
          </div>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.message}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full bg-[#d4af37] text-white py-4 px-6 rounded-lg font-medium
            hover:bg-[#b8860b] transition-all duration-200 elegant-button
            flex items-center justify-center space-x-2
            ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
          `}
        >
          <FiSend className="w-5 h-5" />
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
