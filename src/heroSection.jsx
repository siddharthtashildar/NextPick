import React from 'react';
import Navbar from './components/navbar';
import MovieThumbnailsHome from './components/movieThumnails';
import EndSection from './components/endSection';
import Carousel from './components/Carousel';
import GenreSection from './components/genreSection';

const HeroSection = () => {
  return (

    <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white ">
      <Navbar />
      <Carousel />
      <MovieThumbnailsHome />
      <GenreSection />
      <EndSection />
    </div>

  );
};

export default HeroSection;