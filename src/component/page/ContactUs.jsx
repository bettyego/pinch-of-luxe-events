import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { useFormSubmission } from '../../hooks/useApi';
import apiService from '../../services/api';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Use the backend API hook
  const { isSubmitting, submitError, submitSuccess, submitForm, resetForm } = useFormSubmission();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!validateForm()) {
      return;
    }

    // Submit to backend API
    const response = await submitForm(apiService.submitContactForm, {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: 'website'
    });

    if (response.success) {
      console.log('✅ Contact form submitted successfully:', response.data);

      // Reset form on success
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});

      // Reset form status after 5 seconds
      setTimeout(() => resetForm(), 5000);
    } else {
      console.error('❌ Contact form submission failed:', response.error);
      setErrors({
        general: response.error || 'Failed to send message. Please try again or contact us directly.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#fef9ec] py-16 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[rgb(234,171,12)] mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to make your event unforgettable? Contact us today and let's bring your vision to life!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#b8860b]">
              <h2 className="text-2xl font-bold text-[#006400] mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[rgb(234,171,12)] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#006400] mb-1">Address</h3>
                    <p className="text-gray-600">123 Event Street</p>
                    <p className="text-gray-600">Your City, State 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[rgb(234,171,12)] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#006400] mb-1">Phone</h3>
                    <a href="tel:+13019063939" className="text-gray-600 hover:text-[rgb(234,171,12)] transition-colors">
                      +1 (301) 906-3939
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[rgb(234,171,12)] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#006400] mb-1">Email</h3>
                    <a href="mailto:pinchofluxeevents@gmail.com" className="text-gray-600 hover:text-[rgb(234,171,12)] transition-colors">
                      pinchofluxeevents@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[rgb(234,171,12)] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#006400] mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-r from-[rgb(234,171,12)] to-[#d4af37] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Response Guarantee</h3>
              <p className="mb-4">
                We understand that planning events can be time-sensitive. That's why we promise to respond to all inquiries within 24 hours!
              </p>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-200" />
                <span className="font-semibold">24-hour response time</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#b8860b]">
            <h2 className="text-2xl font-bold text-[#006400] mb-6">Send Us a Message</h2>
            
            {submitSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
                <FaCheckCircle />
                <span>Thank you for your message! We'll get back to you within 24 hours.</span>
              </div>
            )}

            {(submitError || errors.general) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {submitError || errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#006400] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(234,171,12)] transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#006400] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(234,171,12)] transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#006400] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(234,171,12)] transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#006400] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(234,171,12)] transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your event, questions, or how we can help you..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[rgb(234,171,12)] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
