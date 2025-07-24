import { useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useFormSubmission } from '../../hooks/useApi';
import apiService from '../../services/api';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    eventType: '',
    services: [],
    venue: '',
    eventDate: '',
    guestCount: '',
    vision: '',
    budget: '',
    planner: '',
    consultation: '',
    pricingGuide: false,
    referral: '',
  });

  const [errors, setErrors] = useState({});

  // Use the backend API hook
  const { isSubmitting, submitError, submitSuccess, submitForm, resetForm } = useFormSubmission();

  // Country select options (using react-select-country-list)
  const countries = countryList().getData();

  // Event types options
  const eventTypes = [
    'Wedding Reception',
    'Wedding Ceremony',
    'Corporate/Commercial',
    'Engagement/Proposal',
    'Bridal Shower',
    'Baby Shower',
    'Birthday',
    'Other'
  ];

  // Services options
  const serviceOptions = [
    'Floral Design',
    'Event Design',
    'Rentals'
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else {
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle multi-select for services
  const handleMultiSelect = (selected) => {
    setFormData({ ...formData, services: selected.map(s => s.value) });
  };

  // Handle country change
  const handleCountryChange = (selected) => {
    setFormData({ ...formData, country: selected ? selected.label : '' });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Rate limiting check
    const userIdentifier = formData.email || 'anonymous';
    if (!formSubmissionLimiter.isAllowed(userIdentifier)) {
      const remainingTime = Math.ceil(formSubmissionLimiter.getRemainingTime(userIdentifier) / 60000);
      alert(`Too many submission attempts. Please wait ${remainingTime} minutes before trying again.`);
      return;
    }

    // Submit to backend API
    const response = await submitForm(apiService.submitInquiryForm, {
      ...formData,
      submittedAt: new Date().toISOString(),
      source: 'website'
    });

    if (response.success) {
      console.log('✅ Inquiry form submitted successfully:', response.data);

      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        eventType: '',
        services: [],
        venue: '',
        eventDate: '',
        guestCount: '',
        vision: '',
        budget: '',
        planner: '',
        consultation: '',
        pricingGuide: false,
        referral: '',
      });
      setErrors({});

      // Reset form status after 5 seconds
      setTimeout(() => resetForm(), 5000);
    } else {
      console.error('❌ Inquiry form submission failed:', response.error);
      setErrors({
        general: response.error || 'Failed to send inquiry. Please try again or contact us directly.'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-14">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">Event Inquiry Form</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.firstName ? 'border-red-500' : ''
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div className="col-span-1">
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.lastName ? 'border-red-500' : ''
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="col-span-1">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Country Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <Select options={countries} onChange={handleCountryChange} value={countries.find(c => c.label === formData.country)} />
        </div>

        {/* Event Type Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Type</label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
              errors.eventType ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
          {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
        </div>

        {/* Services Multi-Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Services Interested In</label>
          <Select
            isMulti
            options={serviceOptions.map(option => ({ value: option, label: option }))} 
            onChange={handleMultiSelect}
            value={formData.services.map(service => ({ value: service, label: service }))}
          />
        </div>

        {/* Venue & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Venue Name"
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.venue ? 'border-red-500' : ''
              }`}
            />
            {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
          </div>
          <div className="col-span-1">
            <input
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.eventDate ? 'border-red-500' : ''
              }`}
            />
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
          </div>
        </div>

        {/* Guest Count & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <input
              name="guestCount"
              value={formData.guestCount}
              onChange={handleChange}
              placeholder="Guest Count"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div className="col-span-1">
            <textarea
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              placeholder="Event Vision (Optional)"
              rows="4"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>

        {/* Budget, Planner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <input
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Decor Budget"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div className="col-span-1">
            <input
              name="planner"
              value={formData.planner}
              onChange={handleChange}
              placeholder="Planner Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
        </div>

        {/* Consultation & Pricing Guide */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Interested in a Consultation?</label>
          <select
            name="consultation"
            value={formData.consultation}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">I would like to receive the Pricing Guide</label>
          <input
            name="pricingGuide"
            type="checkbox"
            checked={formData.pricingGuide}
            onChange={handleChange}
            className="w-4 h-4 text-green-600"
          />
        </div>

        {/* Referral */}
        <div>
          <label className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
          <input
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            placeholder="Referral Source"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 mt-6 rounded-full text-white bg-[#d4af37] hover:bg-[#d4af37] transition disabled:opacity-50`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {submitSuccess && (
        <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-green-600">✅</span>
            <span className="font-semibold">Your inquiry has been sent successfully! We will get back to you shortly.</span>
          </div>
        </div>
      )}

      {(submitError || errors.general) && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-red-600">❌</span>
            <span>{submitError || errors.general}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryForm;
