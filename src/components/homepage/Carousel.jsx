import React, { useEffect, useState } from "react";
import { fetchMoviesCarousel } from "../../tmdbApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [direction, setDirection] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0); // Added

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMoviesCarousel(15);
      setMovies(data);
      setCurrentMovies(data);
    };
    getMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [movies, currentIndex]); 

  const nextSlide = () => {
    setDirection(1);
    setCurrentMovies((prev) => [...prev.slice(1), prev[0]]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentMovies((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  return (
    <div className="relative top-0 w-full h-screen overflow-hidden">
      {currentMovies.length > 0 && (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovies[0].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full transition-all"
            >
              <img
                src={`https://image.tmdb.org/t/p/original/${currentMovies[0].backdrop_path}`}
                alt={currentMovies[0].title}
                className="w-full h-full object-cover opacity-25"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-60 left-140  transform -translate-x-1/2 text-white text-left w-3/4">
            <h2 className="text-6xl font-bold leading-tight animate-fade-right animate-once animate-ease-linear">
              Discover Your Perfect <br /> Movie with{" "}
              <span className="text-[#fca311] ">NextPick</span>
            </h2>
            <p className="text-lg text-[#e5e5e5] animate-fade-right animate-once animate-ease-linear mt-4 mb-6 max-w-xl text-left">
              Tired of endlessly scrolling through streaming platforms, unsure
              of what to watch? Let NextPick help you find the perfect movie
              match.
            </p>
            <button className="bg-transparent text-[#fca311] border-2 border-[#fca311] animate-fade-right animate-once animate-ease-linear px-8 py-3 rounded-md font-semibold hover:bg-[#fca311] hover:text-black transition duration-300 hover:scale-110">
              Start Quiz
            </button>
          </div>

          <button
            onClick={prevSlide}
            className="absolute background-transparent bottom-6 left-150 transform -translate-y-1/2 p-3 rounded-full text-white text-lg hover:bg-black text-[#fca311] transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute background-transparent bottom-6 left-160 transform -translate-y-1/2 p-3 rounded-full text-white text-lg hover:bg-black text-[#fca311] transition"
          >
            <FaChevronRight />
          </button>

          <div className="absolute bottom-10 left-230 transform -translate-x-1/2 flex gap-4 items-end">
            {currentMovies.map((movie, index) => (
              <motion.img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                initial={{ x: direction * 1000, opacity: 0 }}  
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -direction * 100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`w-44 h-66 object-cover rounded-lg cursor-pointer transition duration-300 hover:scale-110 ${index === 0 ? "w-54 h-76 opacity-100" : "opacity-70"
                  }`}
                onClick={() =>
                  setCurrentMovies((prev) => {
                    const clickedMovie = prev[index];
                    return [clickedMovie, ...prev.filter((m) => m.id !== clickedMovie.id)];
                  })
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;