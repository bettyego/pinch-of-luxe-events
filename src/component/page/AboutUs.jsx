import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef9ec] to-white">

      {/* HERO */}
      <section className="py-20 px-6 mt-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#006400] mb-6 font-serif">
          About Pinch of Luxe Events
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Every celebration tells a story… and we exist to make yours unforgettable.
        </p>
      </section>

      {/* STORY SECTION */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <h2 className="text-4xl font-bold text-[#006400]">
              Where Passion Meets 
              <span className="text-[#b8860b]"> Beautiful Moments</span>
            </h2>

            <p>
              Pinch of Luxe Events was born from a simple love for beauty, detail, 
              and the joy that comes from bringing people together.
            </p>

            <p>
              What started as a passion for decorating and styling intimate moments 
              has grown into something much deeper—a brand dedicated to creating 
              experiences that feel personal, elegant, and unforgettable.
            </p>

            <p>
              Every event we design is more than just décor. It’s about the emotions, 
              the laughter, the memories, and the once-in-a-lifetime moments that 
              deserve to be celebrated beautifully.
            </p>

            <p>
              We don’t just decorate spaces…  
              <span className="font-semibold text-[#006400]">
                we create moments you’ll never forget.
              </span>
            </p>

            {/* PROMISE BOX */}
            <div className="bg-[#006400] text-white p-6 rounded-2xl">
              <p className="italic">
                "Every detail matters, every moment counts, and every client deserves 
                something truly special."
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src="/own12.jpeg"
              alt="Event Decor"
              className="w-full h-[450px] object-cover rounded-3xl shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-20 px-6 bg-[#fef9ec]">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-[#006400] mb-6">
            Bringing Events to Life
          </h2>

          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Take a glimpse into some of the beautiful moments we’ve created.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            {/* VIDEO 1 */}
            <video
              src="/ChichiBirthdayDecor.mp4"
              controls
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />

            {/* VIDEO 2 */}
            <video
              src="/Braveboy1.mp4"
              controls
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
            />

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#006400] to-[#228B22] text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Let’s Create Something Beautiful Together
        </h2>

        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Whether it’s an intimate gathering or a grand celebration, we’re here 
          to bring your vision to life with elegance and care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/inquiryform"
            className="bg-[#b8860b] px-8 py-3 rounded-full font-semibold hover:opacity-90"
          >
            Book Your Event
          </a>

          <a
            href="/contact"
            className="bg-white text-[#006400] px-8 py-3 rounded-full font-semibold"
          >
            Contact Us
          </a>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;