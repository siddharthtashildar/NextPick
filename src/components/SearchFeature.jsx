import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./navbar";
import { searchMovies, getGenres, getLanguages, searchActors, searchKeywords } from "../tmdbApi";



const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");

    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [keyword, setKeyword] = useState("");
    const [actor, setActor] = useState("");
    const [keywordId, setKeywordId] = useState(null);
    const [actorId, setActorId] = useState(null);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);


    useEffect(() => {
        if (!query) return;

        const fetchFilters = async () => {
            const genreList = await getGenres();
            const languageList = await getLanguages();
            setGenres(genreList);
            setLanguages(languageList);
        };

        fetchFilters(); // Fetch genres and languages

        setResults([]);
        setPage(1);
        setTotalPages(1);
        fetchResults(1, {});
    }, [query]);

    const fetchResults = async (pageNum, filters = {}) => {
        setLoading(true);
        try {
            const { results: newResults, totalPages } = await searchMovies(
                query,
                pageNum,
                filters
            );

            if (pageNum === 1) {
                setResults(newResults);
            } else {
                setResults((prev) => [...prev, ...newResults]);
            }

            setTotalPages(totalPages);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };



    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchResults(nextPage, {});
    };

    const handleGenreChange = (e) => {
        const genreId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedGenres((prev) => [...prev, genreId]);
        } else {
            setSelectedGenres((prev) => prev.filter((id) => id !== genreId));
        }
    };

    const applyFilters = async () => {
        let keywordRes = keyword ? await searchKeywords(keyword) : [];
        let actorRes = actor ? await searchActors(actor) : [];

        setKeywordId(keywordRes[0]?.id || null);
        setActorId(actorRes[0]?.id || null);

        setPage(1);
        fetchResults(1, {
            genreIds: selectedGenres,
            language: selectedLanguage,
            keywordId: keywordRes[0]?.id,
            actorId: actorRes[0]?.id,
        });
    };

    return (

        <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white">

            <Navbar />
            <div className="flex">



                <aside className="w-64 bg-[#1a1a2e] text-white sticky top-0 h-screen overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-300">
                    <h3 className="text-lg font-bold mb-4 mt-16">Filters</h3>

                    <button
                        onClick={applyFilters}
                        className="bg-[#fca311] text-black px-6 py-1 rounded-md font-semibold hover:bg-[#ffb627] transition duration-300 hover:scale-110 px-4 py-2 rounded w-full mt-4 mb-4"
                    >
                        Apply Filters
                    </button>

                    {/* Genre Filter */}
                    <div className="mb-6 flex flex-col items-start">
                        <h4 className="font-semibold mb-2">Genre</h4>
                        {genres.map((genre) => (
                            <label key={genre.id} className="block">
                                <input
                                    type="checkbox"
                                    value={genre.id}
                                    onChange={handleGenreChange}
                                    checked={selectedGenres.includes(genre.id)}
                                />
                                <span className="ml-2">{genre.name}</span>
                            </label>
                        ))}
                    </div>

                    {/* Language Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Language</h4>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full bg-black p-1 rounded"
                        >
                            <option value="">All</option>
                            {languages.map((lang) => (
                                <option key={lang.iso_639_1} value={lang.iso_639_1}>
                                    {lang.english_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Keyword Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Mood/Keyword</h4>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full p-1 text-sm text-white bg-gray-900 opacity-75 rounded-md pl-10 focus:outline-none focus:bg-black focus:border-1 focus:text-gray-200"
                            placeholder="e.g. adventure, love"
                        />
                    </div>

                    {/* Actor Filter */}
                    <div className="mb-6">
                        <h4 className="font-semibold mb-2">Actor</h4>
                        <input
                            type="text"
                            value={actor}
                            onChange={(e) => setActor(e.target.value)}
                            className="w-full p-1 text-sm text-white bg-gray-900 opacity-75 rounded-md pl-10 focus:outline-none focus:bg-black focus:border-1 focus:text-gray-200"
                            placeholder="e.g. Tom Cruise"
                        />
                    </div>


                </aside>
                <div className="px-20 pt-20  ">
                    <h2 className="text-xl font-bold mb-16 text-left mt-16">Search results for: "{query}"</h2>
                    {results.length === 0 && !loading ? (
                        <p>No results found.</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-16 justify-center flex-wrap">
                                {results.map((movie) => (
                                    <div key={movie.id} className="w-60 h-84 bg-tranparent cursor-pointer shadow-md">
                                        <Link to={`/view?movieid=${movie.id}`}>
                                            <img
                                                src={
                                                    movie.poster_path
                                                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                                        : "https://via.placeholder.com/200x300?text=No+Image"
                                                }
                                                alt={movie.title}
                                                className="w-full h-full object-cover opacity-70 object-cover rounded-lg transition-all duration-300 hover:scale-110"
                                            />
                                        </ Link>
                                        <h3 className="text-md mt-2 font-semibold">{movie.title}</h3>
                                    </div>
                                ))}
                            </div>
                            {page < totalPages && (
                                <div className="mt-16 mb-16 text-center">

                                    <button
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                        class="group relative inline-flex mt-5 h-12 items-center justify-center  overflow-hidden rounded-md bg-neutral-950 px-20 font-medium text-neutral-200 duration-500">
                                        <div class=" text-[#fca311] translate-x-0 opacity-100 transition group-hover:-translate-x-[150%]  group-hover:opacity-0">

                                            {loading ? "Loading..." : "Load More"}
                                        </div>
                                        <div class="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="#fca311" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6">
                                                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="#fca311" fill-rule="evenodd" clip-rule="evenodd">
                                                </path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>



            </div>


        </ div>
    );
};

export default SearchResults;
