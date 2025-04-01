import { useState, useCallback, useEffect } from "react";

import { fetchUpcomingMoviesAuthPage } from "../../tmdbApi.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


const MovieSideBar = () => {

    const [movies, setMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [direction, setDirection] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchUpcomingMoviesAuthPage(8);
            setMovies(data);
            setCurrentMovies(data);
            console.log(data);
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
        <div className=" object-fill relative my-4 mx-4 w-screen h-screen overflow-hidden">


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
                                className="w-full h-full object-cover bg-blend-darken opacity-45  rounded-4xl"
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className=" absolute top-8 py-4 px-5  w-[35%] bg-gradient-to-r from-black to-transparent">
                        <h1 className="text-white font-bold text-left ">Upcoming: {currentMovies[0].title}</h1>
                    </div>



                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className=" absolute bottom-10 right-0 w-[45%]  py-10 px-5  bg-gradient-to-l from-black to-transparent " >
                            <h1 className="text-lg font-bold text-[#fca311]" >👀 What’s on Your Watchlist?</h1>
                            <p className="text-sm text-white">Rate, review & track your favorite movies!</p>
                        </div>

                    </motion.div>



                    <button
                        onClick={prevSlide}
                        className="absolute background-black bottom-6 left-0 transform -translate-y-1/2 p-3 rounded-full text-white text-lg hover:bg-black text-[#fca311] transition"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute background-black bottom-6 left-15 transform -translate-y-1/2 p-3 rounded-full text-white text-lg hover:bg-black text-[#fca311] transition"
                    >
                        <FaChevronRight />
                    </button>

                </>
            )}
        </div>
    );

}

export default MovieSideBar;