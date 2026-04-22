import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ EMAIL REDIRECT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("New Event Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\n\nEmail: ${formData.email}\n\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:pinchofluxeevents@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#006400] mb-4">
              Let’s Create Something Beautiful
            </h1>
            <p className="text-gray-600">
              We’d love to hear about your event. Tell us your vision and we’ll bring it to life with elegance and detail.
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">

            {/* PHONE */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#b8860b] text-white flex items-center justify-center rounded-full">
                <FaPhone />
              </div>

              <div>
                <p className="font-semibold text-[#006400]">Phone</p>

                <a
                  href="tel:+12407081721"
                  className="block text-gray-600 hover:text-[#b8860b] transition"
                >
                  240-708-1721
                </a>

                <a
                  href="tel:+13019063939"
                  className="block text-gray-600 hover:text-[#b8860b] transition"
                >
                  +1 (301) 906-3939
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#b8860b] text-white flex items-center justify-center rounded-full">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-semibold text-[#006400]">Email</p>
                <p className="text-gray-600">pinchofluxeevents@gmail.com</p>
              </div>
            </div>

          </div>

          {/* RESPONSE CARD */}
          <div className="bg-[#b8860b] text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Our Commitment</h3>
            <p className="text-sm mb-3">
              We respond to all inquiries with care and attention.
            </p>
            <div className="flex items-center gap-2">
              <FaCheckCircle />
              <span className="text-sm font-medium">Response within 48 hours</span>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#b8860b]">

          <h2 className="text-2xl font-bold text-[#006400] mb-6">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Tell us about your event..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#b8860b] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <FaPaperPlane />
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;