import { useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

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
  const countries = countryList().getData();

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

  const serviceOptions = [
    'Floral Design',
    'Event Design',
    'Rentals'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.eventType) newErrors.eventType = 'Event type is required';
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required';
    if (!formData.eventDate) newErrors.eventDate = 'Event date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMultiSelect = (selected) => {
    setFormData({ ...formData, services: selected.map(s => s.value) });
  };

  const handleCountryChange = (selected) => {
    setFormData({ ...formData, country: selected ? selected.label : '' });
  };

  // ✅ EMAIL REDIRECT FIX
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const subject = encodeURIComponent("New Event Inquiry");

    const body = encodeURIComponent(`
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}

Event Type: ${formData.eventType}
Services: ${formData.services.join(', ')}

Venue: ${formData.venue}
Event Date: ${formData.eventDate}
Guest Count: ${formData.guestCount}

Vision:
${formData.vision}

Budget: ${formData.budget}
Planner: ${formData.planner}
Consultation: ${formData.consultation}

Pricing Guide: ${formData.pricingGuide ? 'Yes' : 'No'}
Referral: ${formData.referral}
    `);

    window.location.href = `mailto:pinchofluxeevents@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-14">
      <h2 className="text-3xl font-semibold text-center text-green-700 mb-8">
        Event Inquiry Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* NAME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input" />
        </div>

        {/* CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" />
        </div>

        {/* COUNTRY */}
        <Select options={countries} onChange={handleCountryChange} />

        {/* EVENT TYPE */}
        <select name="eventType" value={formData.eventType} onChange={handleChange} className="input">
          <option value="">Select Event Type</option>
          {eventTypes.map((t, i) => <option key={i}>{t}</option>)}
        </select>

        {/* SERVICES */}
        <Select
          isMulti
          options={serviceOptions.map(s => ({ value: s, label: s }))}
          onChange={handleMultiSelect}
        />

        {/* VENUE & DATE */}
        <div className="grid md:grid-cols-2 gap-6">
          <input name="venue" value={formData.venue} onChange={handleChange} placeholder="Venue" className="input" />
          <input name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} className="input" />
        </div>

        {/* VISION */}
        <textarea name="vision" value={formData.vision} onChange={handleChange} placeholder="Event Vision" className="input" />

        {/* SUBMIT */}
        <div className="text-center">
          <button className="px-8 py-3 mt-6 rounded-full text-white bg-[#b8860b] hover:opacity-90">
            Send Inquiry
          </button>
        </div>

      </form>
    </div>
  );
};

export default InquiryForm;