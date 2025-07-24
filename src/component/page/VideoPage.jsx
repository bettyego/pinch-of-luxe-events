import React from 'react';

const VideoPage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background with Sound */}
      <video
        autoPlay
        loop
        playsInline
        controls // Optional: remove if you don’t want controls
        className="absolute top-0 left-0 w-full h-screen object-cover z-0"
      >
        <source src="/chiVid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default VideoPage;
