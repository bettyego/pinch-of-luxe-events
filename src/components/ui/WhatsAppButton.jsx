import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { FiMessageCircle, FiCalendar, FiDollarSign, FiHelpCircle, FiPhone } from 'react-icons/fi';

// WhatsApp configuration
const WHATSAPP_CONFIG = {
  phoneNumber: '+13019063939', // Maryland, USA WhatsApp number
  businessName: 'Pinch of Luxe Events',
  businessEmail: 'pinchofluxeevents@gmail.com',
  welcomeMessage: 'Hello! 👋 Welcome to Pinch of Luxe Events. How can we help make your event extraordinary?'
};

// Predefined message templates
const MESSAGE_TEMPLATES = {
  general: {
    icon: FiMessageCircle,
    title: 'General Inquiry',
    message: `Hello ${WHATSAPP_CONFIG.businessName}! 👋

I'm interested in learning more about your event planning services. Could you please provide me with more information about your offerings and availability?

Thank you!`
  },
  quote: {
    icon: FiDollarSign,
    title: 'Request Quote',
    message: `Hello ${WHATSAPP_CONFIG.businessName}! 💰

I would like to request a quote for my upcoming event:

📅 Event Date: [Please specify]
🎉 Event Type: [Wedding/Birthday/Corporate/etc.]
👥 Guest Count: [Approximate number]
📍 Location: [City/Venue]
🎨 Services Needed: [Decorations/Planning/etc.]

Thank you for your time!`
  },
  booking: {
    icon: FiCalendar,
    title: 'Book Consultation',
    message: `Hello ${WHATSAPP_CONFIG.businessName}! 📅

I would like to schedule a consultation to discuss my event planning needs:

🕐 Preferred Date: [Please specify]
⏰ Preferred Time: [Please specify]
📞 Contact Preference: [WhatsApp/Phone/In-person]

Event Details:
🎉 Event Type: [Please specify]
📅 Tentative Event Date: [Please specify]
👥 Expected Guest Count: [Approximate number]

Looking forward to hearing from you!`
  },
  support: {
    icon: FiHelpCircle,
    title: 'Customer Support',
    message: `Hello ${WHATSAPP_CONFIG.businessName}! 🆘

I need assistance with the following:

[Please describe your question or concern]

Thank you for your help!`
  }
};

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customMessage, setCustomMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Show button after page load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedTemplate(null);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const openWhatsApp = (message) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setSelectedTemplate(null);
  };

  const sendCustomMessage = () => {
    if (!customMessage.trim()) return;
    
    const message = `Hello ${WHATSAPP_CONFIG.businessName}! 👋

${customMessage}

Thank you!`;
    
    openWhatsApp(message);
    setCustomMessage('');
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform duration-200" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </button>
      </motion.div>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200"
                >
                  <FaTimes className="text-sm" />
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaWhatsapp className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Chat with us on WhatsApp</h3>
                    <p className="text-green-100 text-sm">{WHATSAPP_CONFIG.welcomeMessage}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {!selectedTemplate ? (
                  <div className="space-y-4">
                    <p className="text-gray-600 text-sm mb-4">
                      Choose a message template or write a custom message:
                    </p>
                    
                    {/* Template Options */}
                    <div className="space-y-3">
                      {Object.entries(MESSAGE_TEMPLATES).map(([key, template]) => (
                        <motion.button
                          key={key}
                          onClick={() => openWhatsApp(template.message)}
                          className="w-full p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors duration-200">
                              <template.icon className="text-green-600 text-lg" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200">
                                {template.title}
                              </h4>
                              <p className="text-gray-500 text-sm">
                                Quick message template
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Custom Message Option */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <FiPhone className="mr-2 text-green-600" />
                        Custom Message
                      </h4>
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Write your custom message here..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        rows="4"
                      />
                      <motion.button
                        onClick={sendCustomMessage}
                        disabled={!customMessage.trim()}
                        className="mt-3 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                        whileHover={{ scale: customMessage.trim() ? 1.02 : 1 }}
                        whileTap={{ scale: customMessage.trim() ? 0.98 : 1 }}
                      >
                        <FaPaperPlane className="text-sm" />
                        <span>Send WhatsApp Message</span>
                      </motion.button>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
