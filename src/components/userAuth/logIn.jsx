import React, { useEffect, useState } from "react";
import { fetchUpcomingMoviesAuthPage } from "../../tmdbApi";
import { FaChevronLeft, FaChevronRight , FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";


const LogInPage = () => {

    const [movies, setMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [direction, setDirection] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchUpcomingMoviesAuthPage(3);
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

        <div className="flex justify-center object-fill fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white">
            <div className="top-0 w-3/4 h-screen my-4 mx-4 content-center">
                <h1 className="text-4xl font-extrabold">NextPick</h1>
                <p className="text-xs mt-1 font-light">Your Personal Movie Genie!</p>
                <div className="flex justify-center mt-10">
                    <Link to = "/signup"><button className="mr-1 w-34 py-1 rounded-lg bg-transparent text-[#fca311] border-2 border-[#fca311] transition duration-300 hover:scale-110">Sign Up</button></Link>
                    
                    <button className="ml-1 w-34 py-1 rounded-lg bg-[#fca311] text-black border-2 border-[#fca311] transition duration-300 hover:scale-110">Log In</button>
                </div>
                <h1 className="text-3xl mt-10 text-left px-[25%] font-bold">Welcome back</h1>
                <p className="text-sm text-[#e5e5e5] px-[25%] text-left">Enter your credentials to get started</p>
                <div className="flex flex-col  justify-center items-center">
                    <input className=" cursor-pointer w-70 mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="username" />
                    <div className="relative flex flex-col justify-center items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="cursor-pointer w-70 mt-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[50%] text-slate-400 hover:text-[#fca311] transition"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    
                </div>
                <p className="text-xs text-slate-200 mt-2 px-[25%] text-left italic">forgot password?</p>
                <button className="w-70 mt-10 h-9 rounded-md bg-slate-200 font-bold text-black border-2 border-slate-200 transition duration-300 hover:scale-110">LOG IN</button>

            </div>
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
                            <h1 className="text-lg font-bold ]" >  <span className="text-white">NextPick</span>, 
                            <span className="text-[#fca311]"> Your Movie Buddy!</span></h1>
                            <p className="text-sm text-white">Helping you pick the perfect movie—every time.</p>
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
        </div>
    );

}

export default LogInPage;