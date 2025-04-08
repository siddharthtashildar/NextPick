import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';



const GenreSection = () => {

    return (
        <>

            <div className="mt-20 animate-fade-up animate-once animate-ease-linear">
                <p className="text-xs text-[#fca311]">CATEGORY</p>
                <h2 className="text-lg font-bold"> Explore by Genre</h2>
            </div>
            <div className="mt-10">
                <div className="mt-10 flex justify-center gap-4 items-center flex-wrap pl-15 pr-15">
                    <Link to={`/search?q=&genre=878`}>
                        <div className="relative bg-transparent cursor-pointer h-60 w-100 shadow-md">
                            <video autoPlay muted loop id="video1" className="w-full h-full">
                                <source src="src\assets\homepageVids\Scifi.mp4" type="video/mp4" />
                            </video>
                            <p className="absolute bottom-5 left-5 text-lg">Sci-Fi</p>
                        </div>
                    </Link>
                    <Link to={`/search?q=&genre=10749`}>
                        <div className=" relative bg-transparent cursor-pointer h-56 w-66 shadow-md">
                            <video autoPlay muted loop id="video2" className="w-full h-full">
                                <source src="src\assets\homepageVids\romantic.mp4" type="video/mp4" />
                            </video>
                            <p className="absolute bottom-3 left-8 text-lg">Romance</p>
                        </div>
                    </Link>
                    <Link to={`/search?q=&genre=16`}>
                        <div className="relative bg-transparent cursor-pointer h-56 w-66 shadow-md">
                            <video autoPlay muted loop id="video3" className="w-full h-full">
                                <source src="src\assets\homepageVids\Animated.mp4" type="video/mp4" />
                            </video>
                            <p className="absolute bottom-3 left-8 text-lg">Animated</p>
                        </div>
                    </Link>
                </div>
                <div className="mt-4 flex justify-center gap-4 items-center flex-wrap pl-15 pr-15">
                    <Link to={`/search?q=&genre=18`}>
                        <div className="relative bg-transparent cursor-pointer h-56 w-66 shadow-md">
                            <video autoPlay muted loop id="video4" className="w-full h-full">
                                <source src="src\assets\homepageVids\drama.mp4" type="video/mp4" />
                            </video>
                            <p className="absolute bottom-3 left-8 text-lg">Drama</p>
                        </div>
                    </Link>
                    <Link to={`/search?q=&genre=28`}>
                        <div className="relative bg-transparent cursor-pointer h-56 w-66 shadow-md">
                            <video autoPlay muted loop id="video5" className="w-full h-full">
                                <source src="src\assets\homepageVids\Action.mp4" type="video/mp4" />
                            </video>
                            <p className="absolute bottom-3 left-8 text-lg">Action</p>
                        </div>
                    </Link>
                    <Link to={`/search?q=&genre=27`}>
                        <div className="relative bg-transparent cursor-pointer h-60 w-100 shadow-md">
                            <video autoPlay muted loop id="video6" className="w-full h-full">
                                <source src="src\assets\homepageVids\Horror.mp4" type="video/mp4" />
                            </video>
                            <p className="absolute bottom-5 left-5 text-lg">Horror</p>
                        </div>
                    </Link>
                </div>
                <div className="mt-10 flex justify-center gap-4 items-center flex-wrap pl-15 pr-15">
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> THRILLER</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> MYSTERY</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> HISTORICAL</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> BIOGRAPHY</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> DOCUMENTRY</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> FANTASY</button>
                </div>
                <div className="mt-2 flex justify-center gap-4 items-center flex-wrap pl-15 pr-15">
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> COMEDY</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> SPORTS</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> WAR</button>
                    <button className="bg-transparent text-lg text-[#BDBDBD] hover:text-white "> MORE CATEGORIES . . . </button>



                </div>
            </div>

        </>
    );
}

export default GenreSection;