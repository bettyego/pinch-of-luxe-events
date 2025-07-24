import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const styleClasses = {
  mainTitle: "elegant-heading text-4xl md:text-5xl text-center text-[#006400] mb-6",
  categoryTitle: "elegant-subheading text-2xl md:text-3xl mb-4",
  description: "elegant-body text-gray-600 text-center max-w-3xl mx-auto mb-12",
  button: "elegant-button px-6 py-2 rounded-full transition-all duration-300",
  categoryButton: "elegant-button text-sm md:text-base px-4 py-2 rounded-full transition-all duration-300"
};

const galleryData = {
  Weddings: ['/w.jpg','/w15.jpg','/w1.jpg','/w2.jpg','/w3.jpg','/w4.jpg','/w5.jpg','/w6.jpg','/w7.jpg','/w8.jpg','/w9.jpg','/w10.jpg','/w11.jpg','/w12.jpg','/w13.jpg','/w14.jpg','/chi15.jpg', '/chi43.jpg', '/chi25.jpg', '/chi40.jpg', '/chi11.jpg', ],
  Birthdays: ['/chi2.jpg', '/chi6.jpg', '/chi17.jpg', '/chi16.jpg', '/chi40.jpg', '/chi10.jpg', '/chi14.jpg', '/chi41.jpg', '/chi42.jpg', '/chi24.jpg', '/chi26.jpg', '/chi30.jpg', '/chi3.jpg'],
  'Baby Showers': ['/chi32.jpg', '/chi31.jpg', '/chi8.jpg', '/chi28.jpg', '/chi29.jpg'],
  'Corporate Events': ['/IMG_4418.jpeg', '/IMG_4419.jpeg', '/IMG_4420.jpeg', '/IMG_4421.jpeg', '/IMG_4422.jpeg', '/IMG_4423.jpeg', '/IMG_4426.jpeg', '/IMG_4427.jpeg', '/IMG_4431.jpeg', '/IMG_4432.jpeg', '/IMG_4433.jpeg', '/IMG_4435.jpeg', '/IMG_4436.jpeg'],
  Kids: ['/chi30.jpg', '/chi34.jpg', '/chi39.jpg', '/chi37.jpg', '/chi44.jpg', '/chi31.jpg', '/chi24.jpg', '/chi35.jpg', '/chi38.jpg', '/chi7.jpg'],
};

const videoData = {
  Weddings: [
    {
      id: 1,
      title: 'Elegant Garden Wedding',
      thumbnail: '/w.jpg',
      videoUrl: '/videos/wedding1.mp4',
      description: 'Beautiful outdoor ceremony with balloon arches and floral arrangements'
    },
    {
      id: 2,
      title: 'Romantic Indoor Reception',
      thumbnail: '/w1.jpg',
      videoUrl: '/videos/wedding2.mp4',
      description: 'Intimate reception with stunning centerpieces and ambient lighting'
    },
    {
      id: 3,
      title: 'Luxury Bridal Setup',
      thumbnail: '/w2.jpg',
      videoUrl: '/videos/wedding3.mp4',
      description: 'Sophisticated bridal table with gold accents and balloon installations'
    }
  ],
  Birthdays: [
    {
      id: 4,
      title: 'Kids Birthday Extravaganza',
      thumbnail: '/chi2.jpg',
      videoUrl: '/videos/birthday1.mp4',
      description: 'Colorful balloon sculptures and themed decorations for a magical celebration'
    },
    {
      id: 5,
      title: 'Adult Birthday Sophistication',
      thumbnail: '/chi6.jpg',
      videoUrl: '/videos/birthday2.mp4',
      description: 'Elegant adult birthday party with sophisticated balloon arrangements'
    },
    {
      id: 6,
      title: 'Surprise Party Setup',
      thumbnail: '/chi17.jpg',
      videoUrl: '/videos/birthday3.mp4',
      description: 'Behind-the-scenes of creating the perfect surprise party atmosphere'
    }
  ],
  'Baby Showers': [
    {
      id: 7,
      title: 'Gender Reveal Surprise',
      thumbnail: '/chi32.jpg',
      videoUrl: '/videos/babyshower1.mp4',
      description: 'Exciting gender reveal with balloon drop and pastel decorations'
    },
    {
      id: 8,
      title: 'Sweet Baby Celebration',
      thumbnail: '/chi31.jpg',
      videoUrl: '/videos/babyshower2.mp4',
      description: 'Soft and sweet baby shower with delicate balloon garlands'
    }
  ],
  'Corporate Events': [
    {
      id: 9,
      title: 'Professional Launch Event',
      thumbnail: '/MORI2202_8Zw.jpg',
      videoUrl: '/videos/corporate1.mp4',
      description: 'Sophisticated corporate event with branded balloon installations'
    },
    {
      id: 10,
      title: 'Award Ceremony Setup',
      thumbnail: '/chi4.jpg',
      videoUrl: '/videos/corporate2.mp4',
      description: 'Elegant award ceremony with professional backdrop and decorations'
    }
  ],
  Kids: [
    {
      id: 11,
      title: 'Magical Kids Party',
      thumbnail: '/chi30.jpg',
      videoUrl: '/videos/kids1.mp4',
      description: 'Fun and colorful kids party with interactive balloon activities'
    },
    {
      id: 12,
      title: 'Themed Character Party',
      thumbnail: '/chi34.jpg',
      videoUrl: '/videos/kids2.mp4',
      description: 'Character-themed party with custom balloon sculptures and decorations'
    }
  ]
};

const Gallery = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState('Weddings');
  const [activeView, setActiveView] = useState('photos'); // 'photos' or 'videos'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);
  
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };
  
  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 1));
  };
  
  const handleReset = (e) => {
    e.stopPropagation();
    setScale(1);
  };

  const categoryButtons = useMemo(() =>
    Object.keys(galleryData).map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-[#b8860b] focus:ring-offset-2 ${
          activeCategory === category
            ? 'bg-[rgb(234,171,12)] text-white'
            : 'bg-white text-[#006400] border border-[#b8860b] hover:bg-[#fdf6e3]'
        }`}
      >
        {category}
      </button>
    )), [activeCategory]
  );

  const swiperConfig = useMemo(() => ({
    modules: [Pagination],
    spaceBetween: 20,
    pagination: { clickable: true },
    breakpoints: {
      640: { slidesPerView: 1.2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fef9ec] to-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className={styleClasses.mainTitle}>Our Gallery</h1>
        <p className={styleClasses.description}>
          Explore our collection of magical moments and elegant celebrations
        </p>
        
        {/* View Toggle Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg border border-[#b8860b]">
            <button
              onClick={() => setActiveView('photos')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'photos'
                  ? 'bg-[rgb(234,171,12)] text-white shadow-md'
                  : 'text-[#006400] hover:bg-gray-100'
              }`}
            >
              📸 Photos
            </button>
            <button
              onClick={() => setActiveView('videos')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'videos'
                  ? 'bg-[rgb(234,171,12)] text-white shadow-md'
                  : 'text-[#006400] hover:bg-gray-100'
              }`}
            >
              🎥 Videos
            </button>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryButtons}
        </div>

        {/* Photos Section */}
        {activeView === 'photos' && (
          <Swiper {...swiperConfig}>
            {galleryData[activeCategory].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden rounded-3xl shadow-xl border border-[#b8860b] bg-white">
                  <img
                    src={img}
                    alt={`${activeCategory} event ${index + 1}`}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                    loading="lazy"
                    onClick={() => setSelectedImage(img)}
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0.5';
                      console.error(`❌ Could not load: ${img}`);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Videos Section */}
        {activeView === 'videos' && (
          <div className="space-y-8">
            {videoData[activeCategory] && videoData[activeCategory].length > 0 ? (
              <>
                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videoData[activeCategory].map((video) => (
                    <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                      <div className="relative overflow-hidden rounded-3xl shadow-xl border border-[#b8860b] bg-white transform group-hover:scale-105 transition-all duration-300">
                        {/* Video Thumbnail */}
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-64 object-cover"
                          />
                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                              <div className="w-0 h-0 border-l-[12px] border-l-[#006400] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                            </div>
                          </div>
                          {/* Duration Badge */}
                          <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                            2:30
                          </div>
                        </div>
                        {/* Video Info */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-[#006400] mb-2">{video.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upload New Video Section */}
                <div className="mt-12 bg-gradient-to-r from-[#fef9ec] to-white rounded-3xl p-8 border border-[#d4af37]">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#006400] mb-4">
                      📹 Upload Your Event Videos
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Share your amazing event videos with us! We'd love to showcase your celebrations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-[rgb(234,171,12)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#d4af37] transition-colors duration-300 transform hover:scale-105">
                        📤 Upload Video
                      </button>
                      <button className="bg-white text-[#006400] border border-[#006400] px-6 py-3 rounded-full font-semibold hover:bg-[#006400] hover:text-white transition-colors duration-300">
                        📧 Email Us Videos
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold text-[#006400] mb-4">
                  No videos available for {activeCategory}
                </h3>
                <p className="text-gray-600 mb-6">
                  We're working on adding videos for this category. Check back soon!
                </p>
                <button className="bg-[rgb(234,171,12)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#d4af37] transition-colors duration-300">
                  📤 Upload First Video
                </button>
              </div>
            )}
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-2xl font-bold text-[#006400]">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                  {/* Placeholder for video player - You can replace this with actual video element */}
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-gray-600 font-semibold mb-2">Video Player Coming Soon</p>
                    <p className="text-sm text-gray-500">
                      To add actual video playback, upload your videos to the public/videos folder
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Path: {selectedVideo.videoUrl}</p>

                    {/* Future video element would go here */}
                    {/*
                    <video
                      controls
                      className="w-full h-full rounded-2xl"
                      poster={selectedVideo.thumbnail}
                    >
                      <source src={selectedVideo.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    */}
                  </div>
                </div>
                <div className="bg-[#fef9ec] rounded-2xl p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedVideo.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Screen Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={() => {
              setSelectedImage(null);
              setScale(1);
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-white text-xl"
                >
                  -
                </button>
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-white text-xl"
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    setSelectedImage(null);
                    setScale(1);
                  }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10 text-white"
                >
                  ✕
                </button>
              </div>
              <div 
                className="max-w-[90vw] max-h-[85vh] overflow-auto"
                onDoubleClick={handleReset}
              >
                <img
                  src={selectedImage}
                  alt="Full size view"
                  className="max-w-full max-h-[85vh] object-contain rounded-lg transition-transform duration-200 cursor-zoom-in"
                  style={{ transform: `scale(${scale})` }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        )}

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
});

export default Gallery;
