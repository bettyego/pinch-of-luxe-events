import React, { useState, useRef } from 'react';
import { FiPlay } from 'react-icons/fi';

const VideoPage = () => {
  const [play, setPlay] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlay(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {!play && (
        <div
          className="absolute inset-0 bg-cover bg-center z-10 flex items-center justify-center"
          style={{ backgroundImage: "url('/chi43.jpg')" }} // your cover image
        >
          <button
            onClick={handlePlay}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-full text-white hover:scale-110 transition"
          >
            <FiPlay size={30} />
          </button>
        </div>
      )}

      <video
        ref={videoRef}
        loop
        playsInline
        controls
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/chiVid.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default VideoPage;