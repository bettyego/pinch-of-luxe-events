import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiCheck, FiArrowRight } from 'react-icons/fi';
import { useToast } from '../../hooks/useToast.jsx';
import ContactForm from '../../components/forms/ContactForm';
import InquiryForm from '../../components/forms/InquiryForm';
import QuoteCalculator from '../../components/ui/QuoteCalculator';
import ImageGallery from '../../components/ui/ImageGallery';
import BookingCalendar from '../../components/ui/BookingCalendar';
import { 
  trackQuoteInteraction, 
  trackBookingInteraction, 
  trackFormInteraction,
  trackGalleryInteractionEnhanced 
} from '../../utils/analytics';

const FeaturesDemo = () => {
  const [activeDemo, setActiveDemo] = useState('toast');
  const { success, error, warning, info, loading, promise } = useToast();

  const features = [
    {
      id: 'toast',
      title: 'Professional Toast Notifications',
      description: 'Beautiful animated notifications for all user interactions',
      icon: '🎉',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'forms',
      title: 'Advanced Contact Forms',
      description: 'Real email sending, validation, and sanitization',
      icon: '📧',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Integration',
      description: 'Floating button with predefined message templates',
      icon: '📱',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'calculator',
      title: 'Quote Calculator',
      description: 'Dynamic pricing with Nigerian Naira currency',
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'gallery',
      title: 'Enhanced Image Gallery',
      description: 'Lightbox, filtering, and smooth animations',
      icon: '🖼️',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'booking',
      title: 'Booking Calendar',
      description: 'Interactive date selection and availability checking',
      icon: '📅',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'analytics',
      title: 'Analytics Integration',
      description: 'Comprehensive business event tracking',
      icon: '📊',
      color: 'from-red-500 to-red-600'
    }
  ];

  const demoToastNotifications = () => {
    success('Event booking confirmed successfully!', {
      title: 'Booking Confirmed',
      duration: 4000
    });

    setTimeout(() => {
      info('Your quote has been saved to your account', {
        title: 'Quote Saved',
        duration: 3000
      });
    }, 1000);

    setTimeout(() => {
      warning('Event date is approaching - please confirm details', {
        title: 'Reminder',
        duration: 5000
      });
    }, 2000);

    setTimeout(() => {
      error('Payment processing failed - please try again', {
        title: 'Payment Error',
        duration: 6000
      });
    }, 3000);
  };

  const demoPromiseToast = async () => {
    const mockApiCall = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success!') : reject(new Error('API Error'));
      }, 3000);
    });

    try {
      await promise(mockApiCall, {
        loading: { message: 'Processing your event booking...' },
        success: { message: 'Event booked successfully!' },
        error: { message: 'Booking failed - please try again' }
      });
    } catch (err) {
      console.log('Promise demo error:', err);
    }
  };

  const demoAnalytics = () => {
    // Demo various analytics tracking
    trackQuoteInteraction('calculate', {
      eventType: 'Wedding',
      total: 250000,
      guestCount: '51-100',
      location: 'Lagos'
    });

    trackBookingInteraction('submit', {
      eventType: 'Birthday Party',
      date: '2024-02-15',
      time: '14:00'
    });

    trackFormInteraction('contact_form', 'submit', {
      estimatedValue: 150000
    });

    trackGalleryInteractionEnhanced('image_view', {
      category: 'weddings',
      id: 'wedding_001'
    });

    success('Analytics events tracked! Check your GA4 dashboard.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="elegant-heading text-4xl md:text-5xl text-gray-900 mb-4">
            Advanced Features Demo
          </h1>
          <p className="elegant-body text-xl text-gray-600 max-w-3xl mx-auto">
            Experience all the powerful features that make Pinch of Luxe Events 
            the most advanced event planning platform
          </p>
        </motion.div>

        {/* Feature Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12"
        >
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveDemo(feature.id)}
              className={`p-4 rounded-xl text-center transition-all duration-200 ${
                activeDemo === feature.id
                  ? `bg-gradient-to-r ${feature.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <div className="text-sm font-medium">{feature.title.split(' ')[0]}</div>
            </motion.button>
          ))}
        </motion.div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Demo Header */}
          <div className={`bg-gradient-to-r ${features.find(f => f.id === activeDemo)?.color} text-white p-6`}>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{features.find(f => f.id === activeDemo)?.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{features.find(f => f.id === activeDemo)?.title}</h2>
                <p className="opacity-90">{features.find(f => f.id === activeDemo)?.description}</p>
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="p-6">
            {activeDemo === 'toast' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={demoToastNotifications}
                    className="bg-[#d4af37] text-white py-3 px-6 rounded-lg hover:bg-[#b8860b] transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiStar />
                    <span>Demo All Toast Types</span>
                  </button>
                  <button
                    onClick={demoPromiseToast}
                    className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiArrowRight />
                    <span>Demo Promise Toast</span>
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Features:</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Success, error, warning, info, and loading states</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Beautiful animations and transitions</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Promise-based toast for async operations</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Customizable duration and positioning</span></li>
                  </ul>
                </div>
              </div>
            )}

            {activeDemo === 'forms' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ContactForm 
                  title="Contact Form Demo"
                  subtitle="Try submitting this form"
                  showEventDate={true}
                />
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Advanced Features:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Real email sending via EmailJS</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Form validation with custom rules</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Input sanitization for security</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Date picker for event dates</span></li>
                    <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Smooth animations and feedback</span></li>
                  </ul>
                </div>
              </div>
            )}

            {activeDemo === 'whatsapp' && (
              <div className="text-center space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">WhatsApp Integration Active</h3>
                  <p className="text-gray-600 mb-4">
                    Check the bottom-right corner of your screen for the floating WhatsApp button!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Features:</h4>
                      <ul className="space-y-1 text-left">
                        <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Floating button with animations</span></li>
                        <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Predefined message templates</span></li>
                        <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Custom message option</span></li>
                        <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Smooth animations and transitions</span></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Templates Available:</h4>
                      <ul className="space-y-1 text-left">
                        <li>• General Inquiry</li>
                        <li>• Request Quote</li>
                        <li>• Book Consultation</li>
                        <li>• Customer Support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDemo === 'calculator' && (
              <QuoteCalculator 
                onQuoteGenerated={(quote) => {
                  success(`Quote generated: ${quote.quote.total.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}`);
                }}
              />
            )}

            {activeDemo === 'gallery' && (
              <ImageGallery 
                showCategories={true}
                showLightbox={true}
                columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
              />
            )}

            {activeDemo === 'booking' && (
              <BookingCalendar 
                onBookingComplete={(booking) => {
                  success(`Booking submitted for ${booking.date} at ${booking.time}`);
                }}
              />
            )}

            {activeDemo === 'analytics' && (
              <div className="space-y-6">
                <div className="text-center">
                  <button
                    onClick={demoAnalytics}
                    className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 mx-auto"
                  >
                    <span>🚀</span>
                    <span>Fire Analytics Events</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Business Events Tracked:</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Quote calculations and saves</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Booking submissions</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Form interactions</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Gallery interactions</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>WhatsApp engagements</span></li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Conversion Tracking:</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Lead generation events</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Quote requests with values</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Booking requests</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Contact form submissions</span></li>
                      <li className="flex items-center space-x-2"><FiCheck className="text-green-500" /><span>Error tracking</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Implementation Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">🎉 All Features Successfully Implemented!</h2>
          <p className="text-lg opacity-90 mb-6">
            Your Pinch of Luxe Events website now has all the advanced features for a premium user experience
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <FiCheck className="text-green-300" />
                <span>{feature.title.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesDemo;
