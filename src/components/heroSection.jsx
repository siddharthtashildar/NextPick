import React from 'react';

import Navbar from './navbar';
import MovieThumbnailsHome from './homepage/movieThumnails';
import EndSection from './homepage/endSection';
import Carousel from './homepage/Carousel';
import GenreSection from './homepage/genreSection';

import { UserAuth } from "../context/AuthContext.jsx";
import Footer from './homepage/Footer.jsx';

const HeroSection = () => {

  const { user } = UserAuth();

  return (

    <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white ">
      <Navbar />
      <Carousel />
      <MovieThumbnailsHome />
      <GenreSection />
      <EndSection />
      <Footer />
    </div>

  );
};

export default HeroSection;