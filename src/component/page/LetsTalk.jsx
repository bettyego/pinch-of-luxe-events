import React from 'react';
import { Link } from 'react-router-dom';

const LetsTalk = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-yellow-50 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Let’s Bring Your Vision to Life</h2>
        <p className="text-xl text-gray-700 mb-6 font-medium">Every celebration starts with a conversation.</p>

        <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
          Whether it’s a birthday bash, baby shower, wedding, or brand launch, Pinchofluxeevents is here to elevate your event with unforgettable balloon decor.
        </p>
        <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
          Ready to get started? Just fill out our inquiry form and share your ideas. We’ll schedule a free consultation to dive into your theme, color palette, and vision.
        </p>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Once we understand your needs, we’ll design a custom decor plan and provide a detailed quote. A signed agreement and 30% deposit will secure your date on our calendar.
        </p>

        <Link 
          to="/inquiryform" 
          className="inline-block bg-green-700 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Start Your Inquiry
        </Link>
      </div>
    </section>
  );
};

export default LetsTalk;
