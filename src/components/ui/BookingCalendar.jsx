import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft, FiChevronRight, FiCalendar, FiClock, 
  FiUser, FiMail, FiPhone, FiMessageSquare, FiCheck 
} from 'react-icons/fi';
import { useToast } from '../../hooks/useToast.jsx';

// Sample availability data - replace with real data from your backend
const SAMPLE_AVAILABILITY = {
  '2024-01-15': { available: true, slots: ['09:00', '14:00', '18:00'] },
  '2024-01-16': { available: true, slots: ['10:00', '15:00'] },
  '2024-01-17': { available: false, reason: 'Fully booked' },
  '2024-01-18': { available: true, slots: ['09:00', '13:00', '17:00'] },
  '2024-01-19': { available: true, slots: ['11:00', '16:00'] },
  '2024-01-20': { available: false, reason: 'Weekend - Premium rates apply' },
  '2024-01-21': { available: false, reason: 'Weekend - Premium rates apply' },
  '2024-01-22': { available: true, slots: ['09:00', '14:00', '18:00'] }
};

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const BookingCalendar = ({ 
  onBookingComplete,
  availabilityData = SAMPLE_AVAILABILITY,
  className = ""
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guestCount: '',
    message: '',
    duration: '4-6 hours'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error, loading, removeToast } = useToast();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get calendar data for current month
  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dateString = currentDateObj.toISOString().split('T')[0];
      const isCurrentMonth = currentDateObj.getMonth() === month;
      const isToday = dateString === new Date().toISOString().split('T')[0];
      const isPast = currentDateObj < new Date().setHours(0, 0, 0, 0);
      const availability = availabilityData[dateString];

      days.push({
        date: new Date(currentDateObj),
        dateString,
        day: currentDateObj.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        availability
      });

      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const selectDate = (day) => {
    if (day.isPast || !day.isCurrentMonth || !day.availability?.available) return;
    
    setSelectedDate(day.dateString);
    setSelectedTime('');
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      error('Please select a date and time');
      return;
    }

    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const loadingToastId = loading('Processing your booking...');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const booking = {
        date: selectedDate,
        time: selectedTime,
        ...bookingData,
        id: Date.now(),
        status: 'pending'
      };

      removeToast(loadingToastId);
      success('Booking request submitted successfully! We\'ll confirm within 24 hours.');
      
      // Reset form
      setSelectedDate(null);
      setSelectedTime('');
      setShowBookingForm(false);
      setBookingData({
        name: '', email: '', phone: '', eventType: '', 
        guestCount: '', message: '', duration: '4-6 hours'
      });

      onBookingComplete?.(booking);

    } catch (err) {
      removeToast(loadingToastId);
      error('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calendarDays = getCalendarData();

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
          <h2 className="elegant-heading text-3xl mb-2">Book Your Event</h2>
          <p className="elegant-body opacity-90">Select your preferred date and time</p>
        </motion.div>
      </div>

      <div className="p-6">
        {/* Calendar Navigation */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          
          <h3 className="elegant-heading text-xl">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </motion.div>

        {/* Calendar Grid */}
        <motion.div variants={itemVariants} className="mb-6">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekdays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isSelected = selectedDate === day.dateString;
              const isAvailable = day.availability?.available && day.isCurrentMonth && !day.isPast;
              
              return (
                <motion.button
                  key={index}
                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                  onClick={() => selectDate(day)}
                  disabled={!isAvailable}
                  className={`
                    aspect-square p-2 text-sm rounded-lg transition-all duration-200 relative
                    ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                    ${day.isToday ? 'ring-2 ring-[#d4af37]' : ''}
                    ${isSelected ? 'bg-[#d4af37] text-white' : ''}
                    ${isAvailable && !isSelected ? 'hover:bg-gray-100 text-gray-900' : ''}
                    ${!isAvailable && day.isCurrentMonth ? 'text-gray-400 cursor-not-allowed' : ''}
                    ${day.isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                  `}
                >
                  {day.day}
                  
                  {/* Availability Indicator */}
                  {day.isCurrentMonth && !day.isPast && (
                    <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      day.availability?.available ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Time Slots */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <h4 className="font-medium text-gray-900 mb-3">Available Time Slots</h4>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {availabilityData[selectedDate]?.slots?.map(time => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedTime === time
                        ? 'border-[#d4af37] bg-[#d4af37] text-white'
                        : 'border-gray-200 hover:border-[#d4af37] hover:bg-[#d4af37]/10'
                    }`}
                  >
                    <FiClock className="mx-auto mb-1" />
                    <div className="text-sm font-medium">{time}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Booking Form */}
        <AnimatePresence>
          {showBookingForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-6"
            >
              <h4 className="font-medium text-gray-900 mb-4">Event Details</h4>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={bookingData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        placeholder="Your name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                        placeholder="+234 xxx xxx xxxx"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Event Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      name="eventType"
                      value={bookingData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      name="guestCount"
                      value={bookingData.guestCount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                      placeholder="Number of guests"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                    >
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="4-6 hours">4-6 hours</option>
                      <option value="6-8 hours">6-8 hours</option>
                      <option value="Full day">Full day</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="message"
                      value={bookingData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-transparent resize-none"
                      placeholder="Tell us about your event requirements..."
                    />
                  </div>
                </div>

                {/* Selected Date/Time Summary */}
                <div className="bg-[#d4af37]/10 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Booking Summary</h5>
                  <div className="text-sm text-gray-700">
                    <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Duration:</strong> {bookingData.duration}</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-[#d4af37] text-white py-3 px-4 rounded-lg hover:bg-[#b8860b] transition-colors flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    <FiCheck className="text-lg" />
                    <span>{isSubmitting ? 'Submitting...' : 'Book Event'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div variants={itemVariants} className="mt-6 pt-6 border-t">
          <h5 className="font-medium text-gray-900 mb-3">Legend</h5>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Unavailable</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#d4af37] rounded-full"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border-2 border-[#d4af37] rounded-full"></div>
              <span>Today</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookingCalendar;
