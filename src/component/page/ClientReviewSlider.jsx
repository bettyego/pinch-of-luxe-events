import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    author: 'Jessica A.',
    content: "Pinch of Luxe Events made my baby shower magical! The balloon arch and color scheme were stunning. Guests couldn't stop taking pictures.",
  },
  {
    id: 2,
    author: 'Michael T.',
    content: "Professional, punctual, and extremely creative. They transformed our corporate event into something vibrant and elegant!",
  },
  {
    id: 3,
    author: 'Sarah K.',
    content: "My daughter’s birthday party was a dream come true thanks to Pinch of Luxe Events. The custom balloon wall was the highlight of the day.",
  },
  {
    id: 4,
    author: 'Emily W.',
    content: "Incredible attention to detail! From the bouquet centerpieces to the photo booth backdrop — everything was flawless.",
  },
  {
    id: 5,
    author: 'David L.',
    content: "Pinch of Luxe Events exceeded our expectations. They delivered on time and created a memorable celebration for our family.",
  },
  {
    id: 6,
    author: 'Jennifer S.',
    content: "The balloon arch and color scheme were stunning. Guests couldn't stop taking pictures.",
  },
  {
    id: 7,
    author: 'Alex R.',
    content: "Professional, punctual, and extremely creative. They transformed our corporate event into something vibrant and elegant!",
  },
  {
    id: 8,
    author: 'Olivia M.',
    content: "My daughter’s birthday party was a dream come true thanks to Pinch of Luxe Events. The custom balloon wall was the highlight of the day.",
  },
  {
    id: 9,
    author: 'Daniel P.',
    content: "Incredible attention to detail! From the bouquet centerpieces to the photo booth backdrop — everything was flawless.",
  },
  {
    id: 10,
    author: 'Sophia C.',
    content: "Pinch of Luxe Events exceeded our expectations. They delivered on time and created a memorable celebration for our family.",
  },
];

const ClientReviewSlider = () => {
  return (
    <section className="bg-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">What Our Clients Say</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
                <FaQuoteLeft className="text-yellow-500 text-3xl mb-4 mx-auto" />
                <p className="text-gray-700 text-lg italic mb-4">"{review.content}"</p>
                <p className="text-green-700 font-semibold">- {review.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ClientReviewSlider;
