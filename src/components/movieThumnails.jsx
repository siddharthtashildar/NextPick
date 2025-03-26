import React, { useEffect, useState } from "react";
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies , fetchNewReleaseMovies} from "../tmdbApi";


const MovieThumbnailsHome = () => {

    const [ForYoustyle,setForYouStyle] = useState(false)
    const [Popularstyle,setPopularStyle] = useState(false)
    const [NewRelstyle,setNewRelStyle] = useState(false)
    const [TopRatedstyle,setTopRatedStyle] = useState(false)
    const [Upcomingstyle,setUpcomingStyle] = useState(false)

    const [hpThumbnailmovies, setHpThumbnailMovies] = useState([]);

    useEffect(() => {
        forYouToggle();
    }, []);

    const forYouToggle = () =>{

        console.log("Toggled For you")
        setForYouStyle(true);
        setNewRelStyle(false);
        setPopularStyle(false);
        setTopRatedStyle(false);
        setUpcomingStyle(false);

        const getMovies = async () => {
            const data = await fetchPopularMovies(8);
            setHpThumbnailMovies(data);
        };
        getMovies();

    }
    const PopularToggle = () =>{
        console.log("Toggled Popu")
        setForYouStyle(false);
        setNewRelStyle(false);
        setPopularStyle(true);
        setTopRatedStyle(false);
        setUpcomingStyle(false);

        const getMovies = async () => {
            const data = await fetchPopularMovies(8);
            setHpThumbnailMovies(data);
        };
        getMovies();
        
    }
    const newReleaseToggle = () =>{
        console.log("Toggled New Realse")
        setForYouStyle(false);
        setNewRelStyle(true);
        setPopularStyle(false);
        setTopRatedStyle(false);
        setUpcomingStyle(false);

        const getMovies = async () => {
            const data = await fetchNewReleaseMovies(8);
            setHpThumbnailMovies(data);
        };
        getMovies();
        
    }
    const topRatedToggle = () =>{
        console.log("Toggled TOp rated")
        setForYouStyle(false);
        setNewRelStyle(false);
        setPopularStyle(false);
        setTopRatedStyle(true);
        setUpcomingStyle(false);

        const getMovies = async () => {
            const data = await fetchTopRatedMovies(8);
            setHpThumbnailMovies(data);
        };
        getMovies();
        
    }
    const upcomingToggle = () =>{
        console.log("Toggled Upcoming")
        setForYouStyle(false);
        setNewRelStyle(false);
        setPopularStyle(false);
        setTopRatedStyle(false);
        setUpcomingStyle(true);

        const getMovies = async () => {
            const data = await fetchUpcomingMovies(8);
            setHpThumbnailMovies(data);
        };
        getMovies();
        
    }
    return(
        
        <>
            <div className="mt-20 animate-fade-up animate-once animate-ease-linear">
                <p className="text-xs text-[#fca311]">SELECTION</p>
                <h2 className="text-lg font-bold"> A best movie just made for you</h2>
            </div>
            <div className="justify-center gap-5 flex-wrap mt-10 animate-fade-up animate-once animate-ease-linear">
                <button className={`bg-transparent text-white text-xs pb-3 pl-10 pr-10 relative hover:text-[#fca311]
                                    ${ForYoustyle ? "border-b-2 border-[#fca311]" : "" }`}
                onClick={forYouToggle} >
                    FOR YOU
                </button>
                <button className={`bg-transparent text-white text-xs pb-3 pl-10 pr-10 relative hover:text-[#fca311]
                                    ${Popularstyle ? "border-b-2 border-[#fca311]" : "" }`}
                onClick={PopularToggle}>
                    POPULAR
                </button>
                <button className={`bg-transparent text-white text-xs pb-3 pl-10 pr-10 relative hover:text-[#fca311]
                                    ${NewRelstyle ? "border-b-2 border-[#fca311]" : "" }`}
                onClick={newReleaseToggle}>
                    NEW RELEASES
                </button>
                <button className={`bg-transparent text-white text-xs pb-3 pl-10 pr-10 relative hover:text-[#fca311]
                                    ${TopRatedstyle ? "border-b-2 border-[#fca311]" : "" }`}
                onClick={topRatedToggle}>
                    TOP RATED
                </button>
                <button className={`bg-transparent text-white text-xs pb-3 pl-10 pr-10 relative hover:text-[#fca311]
                                    ${Upcomingstyle ? "border-b-2 border-[#fca311]" : "" }`}
                onClick={upcomingToggle}>
                    UPCOMING
                </button>
            </div>

            {hpThumbnailmovies.length > 0 && (

                <div className="mt-10 flex justify-center gap-4 flex-wrap pl-15 pr-15 animate-fade-up animate-once animate-ease-linear">
                    {hpThumbnailmovies.map((movie, index) => (

                        <div key={index} className="w-60 h-84 bg-tranparent cursor-pointer shadow-md ">
                            <img
                                key={movie.id}
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover opacity-70 object-cover rounded-lg animate-fade-up animate-once animate-ease-linear transition-all duration-300 hover:scale-110 hover: opacity-100"
                            />
                        </div>
     
                    ))}

                </div>


            )}
            <button class="group relative inline-flex mt-5 h-12 items-center justify-center  overflow-hidden rounded-md bg-neutral-950 px-20 font-medium text-neutral-200 duration-500">
                <div class=" text-[#fca311] translate-x-0 opacity-100 transition group-hover:-translate-x-[150%]  group-hover:opacity-0">
                More
                </div>
                <div class="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="#fca311" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="#fca311" fill-rule="evenodd" clip-rule="evenodd">
                        </path>
                    </svg>
                </div>
            </button>
        </>


    );
};

export default MovieThumbnailsHome;