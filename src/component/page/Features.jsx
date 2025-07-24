import { motion } from 'framer-motion';
import { useState } from 'react';

const features = [
  {
    icon: '/IMG_4418.jpeg',
    title: 'Grand Entrance Designs',
    description: 'Magnificent archways and installations that create breathtaking first impressions for your corporate events.',
  },
  {
    icon: '/w15.jpg',
    title: 'Elegant Wedding Décor',
    description: 'Luxurious arrangements that transform your wedding venue into a romantic fairytale setting.',
  },
  {
    icon: '/IMG_4422.jpeg',
    title: 'Corporate Event Excellence',
    description: 'Sophisticated décor solutions that elevate your brand events with contemporary style and professional elegance.',
  },
  {
    icon: '/w3.jpg',
    title: 'Luxury Wedding Backdrops',
    description: 'Create picture-perfect moments with our custom-designed backdrops and ceiling decorations.',
  },
  {
    icon: '/IMG_4427.jpeg',
    title: 'Statement Pieces & Displays',
    description: 'Eye-catching displays and elegant sculptures that become the centerpiece of your corporate celebration.',
  },
  {
    icon: '/w8.jpg',
    title: 'Premium Wedding Styling',
    description: 'Complete venue transformation with coordinated designs that bring your dream wedding vision to life.',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

const Features = () => {
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

  return (
    <section className="bg-green-50 py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12 text-green-900 leading-tight">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white border border-[#b8860b]/20 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-500 text-center"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-56 sm:h-64 md:h-72 rounded-2xl object-cover mb-4 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedImage(feature.icon)}
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-900">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
    </section>
  );
};

export default Features;
