import React from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa'; // Importing icons

const reviews = [
  { id: 1, author: 'Jessica A.', content: "Pinchofluxeevents made my baby shower magical! The balloon arch and color scheme were stunning. Guests couldn't stop taking pictures." },
  { id: 2, author: 'Michael T.', content: "Professional, punctual, and extremely creative. They transformed our corporate event into something vibrant and elegant!" },
  { id: 3, author: 'Sarah K.', content: "My daughter’s birthday party was a dream come true thanks to Pinchofluxeevents. The custom balloon wall was the highlight of the day." },
  { id: 4, author: 'Daniel O.', content: "Highly recommend! They brought so much life to our wedding reception with tasteful balloon decor that matched our theme perfectly." },
  { id: 5, author: 'Emily W.', content: "Incredible attention to detail! From the bouquet centerpieces to the photo booth backdrop — everything was flawless." },
  { id: 6, author: 'Tunde F.', content: "Our baby naming ceremony had such a festive atmosphere thanks to Pinchofluxeevents’s beautiful balloon garlands and stage decor." },
  { id: 7, author: 'Laura C.', content: "I hired Pinchofluxeevents for a gender reveal and WOW! They nailed the pink-and-blue theme with such elegance and joy." },
  { id: 8, author: 'Gbenga A.', content: "From start to finish, they were easy to work with. The grand opening decor they did for our store was eye-catching and fun." },
  { id: 9, author: 'Nina M.', content: "We loved their balloon backdrop for our family photoshoot. The setup looked straight out of Pinterest!" },
  { id: 10, author: 'Ayo J.', content: "Their creativity is unmatched. Pinchofluxeevents helped me surprise my wife on our anniversary with a heart-themed balloon setup." },
  { id: 11, author: 'Tracy N.', content: "Booking them for our church’s end-of-year party was the best decision. The kids absolutely loved the colorful balloon displays!" },
  { id: 12, author: 'David B.', content: "They came highly recommended and totally lived up to the hype. Their balloon installations are pure art." }
];

const ClientReview = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto mt-12 bg-gradient-to-t from-[#b8860b] to-[#006400] rounded-lg">
      <h2 className="text-5xl font-extrabold text-center text-white mb-12">
        What Our Clients Are Saying
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="bg-white text-[#006400] rounded-2xl p-8 shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-[#b8860b] flex items-center justify-center">
                  <span className="text-4xl text-white font-bold">{review.author[0]}</span>
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-[#006400]">{review.author}</h4>
            </div>

            <p className="text-sm text-[#333333] leading-relaxed mb-6">{review.content}</p>

            <div className="flex justify-center gap-8 mt-6 text-3xl">
              {/* Social Media Icons */}
              <a href="#" className="text-[#b8860b] hover:text-[#006400] transition duration-200">
                <FaFacebookF />
              </a>
              <a href="#" className="text-[#b8860b] hover:text-[#006400] transition duration-200">
                <FaInstagram />
              </a>
              <a href="#" className="text-[#b8860b] hover:text-[#006400] transition duration-200">
                <FaPinterestP />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReview;
