import React, { useState, useMemo } from 'react';

/* ===============================
   🔥 FIXED ROYAL BALL IMAGES
================================ */

const royalBallImages = [
  '/1SM07889.jpg','/1SM07890.jpg','/1SM07891.jpg',
  '/1SM07901.jpg', '/1SM07918.jpg','/1SM07926.jpg',
  '/1SM07934.jpg','/1SM07936.jpg','/1SM07938.jpg','/1SM07940.jpg',
  '/1SM07941.jpg','/1SM07949.jpg','/1SM07959.jpg',
  '/1SM07985.jpg','/1SM07987.jpg','/1SM07989.jpg','/1SM07992.jpg','/1SM07995.jpg',

  '/1SM08004.jpg','/1SM08009.jpg','/1SM08015.jpg','/1SM08017.jpg',
  '/1SM08026.jpg','/1SM08035.jpg','/1SM08041.jpg','/1SM08044.jpg',
  '/1SM08048.jpg','/1SM08049.jpg','/1SM08088.jpg','/1SM08092.jpg',

  '/1SM08100.jpg','/1SM08128.jpg','/1SM08132.jpg','/1SM08135.jpg',
  '/1SM08143.jpg','/1SM08155.jpg','/1SM08162.jpg','/1SM08163.jpg',
  '/1SM08171.jpg','/1SM08178.jpg','/1SM08180.jpg','/1SM08183.jpg','/1SM08187.jpg',

  '/1SM08205.jpg','/1SM08212.jpg','/1SM08232.jpg','/1SM08246.jpg','/1SM08248.jpg',
  '/1SM08257.jpg','/1SM08267.jpg',

  '/1SM08305.jpg','/1SM08307.jpg','/1SM08312.jpg',
  '/1SM08348.jpg','/1SM08357.jpg','/1SM08358.jpg'
];



const galleryData = {
  "Alina & Ariana’s 1st Royal Ball": royalBallImages,

  "Women who Bravely Lead": [
    '/DSC03055.jpg','/DSC03088.jpg','/DSC03181.jpg','/DSC03302.jpg',
    '/DSC03205.jpg','/DSC03185.jpg','/DSC03337.jpg','/DSC03368.jpg',
    '/DSC03392.jpg','/DSC03052.jpg','/DSC03030.jpg','/DSC03245.jpg'
  ],

  "Brunch with Braveboy": [
    '/DSC03021.jpg','/DSC07091.jpg','/DSC07102.jpg','/DSC07146.jpg',
    '/DSC07184.jpg','/DSC07186.jpg','/DSC07232.jpg','/DSC07237.jpg',
    '/DSC07289.jpg','/DSC07296.jpg','/DSC01206-Enhanced-NR.jpg',
    '/DSC01165-Enhanced-NR.jpg','/DSC01126-Enhanced-NR.jpg','/DSC01001-Enhanced-NR.jpg'
  ],

  "Chidinma’s 35th": [
    '/6Y0A8846.jpg','/6Y0A8849.jpg','/6Y0A8850.jpg','/6Y0A8852.jpg',
    '/6Y0A8921.jpg','/6Y0A8912.jpg','/6Y0A8911.jpg','/6Y0A8905.jpg',
    '/6Y0A8867.jpg','/6Y0A8866.jpg','/6Y0A8859.jpg','/6Y0A8897.jpg',
    '/6Y0A8894.jpg','/6Y0A8888.jpg','/6Y0A8886.jpg','/6Y0A8873.jpg',
    '/6Y0A8872.jpg','/6Y0A8868.jpg'
  ],

  "Birthday": [
    '/chi2.jpg','/chi6.jpg','/chi17.jpg','/chi16.jpg','/chi40.jpg',
    '/chi10.jpg','/chi14.jpg','/chi41.jpg','/chi42.jpg','/chi24.jpg',
    '/chi26.jpg','/chi30.jpg','/chi3.jpg','/chi32.jpg','/chi31.jpg',
    '/chi8.jpg','/chi28.jpg','/chi29.jpg'
  ],

  "Kids Party": [
    '/chi30.jpg','/chi34.jpg','/chi39.jpg','/chi37.jpg','/chi44.jpg',
    '/chi31.jpg','/chi24.jpg','/chi35.jpg','/chi38.jpg','/chi7.jpg'
  ]
};

/* ===============================
   💎 COMPONENT
================================ */

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const allImages = useMemo(() => Object.values(galleryData).flat(), []);

  const displayedImages =
    activeCategory === "All"
      ? allImages
      : galleryData[activeCategory] || [];

  const categories = ["All", ...Object.keys(galleryData)];

  return (
    <div className="min-h-screen bg-[#fdfdfd] py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12 py-10">
          <h1 className="text-4xl font-bold text-[#006400] mb-3">
            Our Gallery
          </h1>
          <p className="text-gray-500">
            A collection of our beautifully styled events
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                activeCategory === cat
                  ? "bg-[#b8860b] text-white"
                  : "border border-[#b8860b] text-[#006400]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayedImages.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl shadow cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                loading="lazy"
                alt=""
                onError={(e) => (e.target.style.display = 'none')}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              className="max-w-[90%] max-h-[90%] rounded-lg"
              alt=""
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;