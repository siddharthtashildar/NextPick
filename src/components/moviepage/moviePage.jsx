import { fetchLanguageName, fetchMovieById, fetchMovieTrailer } from "../../tmdbApi";
import Navbar from "../navbar";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import React, { useEffect, useState } from "react";







const MoviePage = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const movieID = searchParams.get('movieid');

    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            const movieData = await fetchMovieById(movieID);
            setMovie(movieData);
        };

        if (movieID) getMovie();
    }, [movieID]);



    useEffect(() => {
        const getTrailer = async () => {
            const url = await fetchMovieTrailer(movieID);
            setTrailerUrl(url);
        };

        getTrailer();
    }, [movieID]);

    return (
        <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white ">
            <Navbar />

            {movie ? (
                <>
                    <div className="relative top-[0] w-full h-[73%] overflow-hidden">
                        <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover opacity-45 shadow-lg"
                        />
                    </div>
                    <div className="absolute top-[50%] left-[5%] w-[18%] ">
                        <img
                            key={movie.id}
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                            alt={movie.title}
                            className={`w-[100%] h-[100%] object-cover rounded-lg cursor-pointer shadow-lg}`}
                        />
                    </div>
                    <div className="trailer-container absolute top-[15%] left-[33%] w-[50%] h-[52%]">
                        {trailerUrl ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={trailerUrl}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                className="rounded-3xl shadow-2xl"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p>No trailer available.</p>
                        )}
                    </div>
                    <div className="text-left absolute top-[75%] left-[25%] w-[70%] ">
                        <h1 className="text-6xl w-full font-bold ml-3 leading-tight">{movie.title.toUpperCase()}</h1>
                        <div className="flex flex-row gap-3 ml-3 mt-3 p-0 m-0">
                            <p className=" bg-[#14213d] rounded-lg  text-xs font-light text-gray-200 py-1 align-center px-4"> RELEASE DATE : {movie.release_date}</p>
                            <p className=" bg-[#14213d] rounded-lg  text-xs font-light text-gray-200 px-4 align-center py-1"> ORIGNAL LANGUAGE : {fetchLanguageName(movie.original_language)}</p>
                            {movie.adult && <p className=" bg-[#14213d] rounded-lg  text-xs font-light text-gray-200 px-4"> ADULT </p>}
                        </div>
                        <p className="text-left font-bold text-md mt-8 ml-3" >OVERVIEW:</p>
                        <p className="text-left text-md mt-3 ml-3 w-[80%] ">{movie.overview}</p>
                        <div className="flex flex-row gap-5 ml-3 mt-10 mb-10 ">
                            <div className="flex flex-col w-40 h-5 justify-between bg-[#14213d] rounded-lg shadow-md text-xs font-light text-gray-200 py-10 px-4">
                                <p>RATINGS </p>
                                <p>{movie.vote_average}</p>
                            </div>
                            <div className="flex flex-col w-40 h-5 justify-between bg-[#14213d] rounded-lg shadow-md text-xs font-light text-gray-200 py-10 px-4">
                                <p>VOTES </p>
                                <p>{movie.vote_count}</p>
                            </div>
                            <div className="flex flex-col w-40 h-5 justify-between bg-[#14213d] rounded-lg shadow-md text-xs font-light text-gray-200 py-10 px-4">
                                <p>POPULARITY </p>
                                <p>{movie.popularity}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 ml-3 p-0 m-0 mb-10">
                            <p className="text-left font-bold text-md  ml-1" > GENRE : </p>
                            {movie.genres.map((genre) => (<Link className="shadow-3xl"> <p className=" bg-[#14213d] rounded-lg   text-xs font-light text-gray-200 py-1 align-center px-4">{genre.name.toUpperCase()}</p></Link>))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    )

}

export default MoviePage;