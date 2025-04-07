// pages/QuizPage.jsx
import React, { useState } from "react";
import quizQuestions from "./quizQuestions";
import { fetchDiscoverMovies } from "../../tmdbApi";
import Navbar from "../navbar";
import { useLocation,Link  } from "react-router-dom";

const QuizPage = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const genreMap = {
        Action: 28,
        Comedy: 35,
        Romance: 10749,
        Horror: 27,
        "Sci-Fi": 878,
      };
      
      const toneKeywordMap = {
        "Light & Funny": 210024,     // "feel-good"
        Emotional: 818,              // "drama"
        Dark: 12554,                 // "dark"
        Suspenseful: 12377,          // "thriller"
        Inspiring: 9715              // "based on true story"
      };

    const handleAnswer = async (answer) => {
        const updatedAnswers = [...answers, answer];
        setAnswers(updatedAnswers);

        if (currentQ === quizQuestions.length - 1) {
            await getMovieSuggestions(updatedAnswers);
            setShowResult(true);
        } else {
            setCurrentQ(currentQ + 1);
        }
    };

    const getMovieSuggestions = async (answers) => {
        const genreId = genreMap[answers[0]];
        const keyword = toneKeywordMap[answers[1]];
      
        const movies = await fetchDiscoverMovies({
          genreId,
          keyword,
          minVote: 6,
          releaseYear: 2015,
          page: 1,
        });
      
        setSuggestions(movies.slice(0, 12));
      };
      
    return (

        <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gradient-to-b from-[#000000] to-[#14213d] min-h-screen text-white ">
            <Navbar />
            <div className="pt-20 px-8 text-white mt-[10%]">
                <h1 className="text-3xl font-bold mb-6">Movie Match Quiz </h1>

                {!showResult ? (
                    <div className=" p-6 rounded-xl shadow-md max-w-xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4">
                            {quizQuestions[currentQ].question}
                        </h2>
                        <div className="flex flex-col gap-6 justify-center flex-wrap">
                            {quizQuestions[currentQ].options.map((opt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(opt)}
                                    className="bg-transparent  py-2 px-4 text-[#fca311] border-2 border-[#fca311]   rounded-md font-semibold hover:bg-[#fca311] hover:text-black transition duration-300 hover:scale-110 "
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className=" mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Your Movie Matches </h2>
                        {suggestions.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-16 justify-center flex-wrap">
                                {suggestions.map((movie) => (
                                    <div key={movie.id} className="w-60 h-84 bg-tranparent cursor-pointer shadow-md">
                                        <Link to={`/view?movieid=${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                                alt={movie.title}
                                                className="w-full h-full object-cover opacity-70 object-cover rounded-lg transition-all duration-300 hover:scale-110"
                                            />
                                        </Link>
                                        <h3 className="mt-2 text-md font-semibold">{movie.title}</h3>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No good matches found. Try again later!</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
