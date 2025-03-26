import axios from "axios";


// const API_KEY = "ab8159b0d55ad9bdf006e8befb5c385"




const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjgxNTliMGQ1NWFkZDliZGYwMDZlOGJlZmI1YzM4NSIsIm5iZiI6MTc0MjczMzEzNi4xOTEsInN1YiI6IjY3ZGZmZjUwNGNlMDdkNjg0ZTA3ZDFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sOOPtYFzzNVlfqiODQVtecC8rgp6AcMpf2gW2TQgxQc"; // 🔹 Replace with your TMDB Bearer Token

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

export const fetchMoviesCarousel = async (n) => {
  try {
    const response = await tmdbApi.get("/movie/popular");
    return response.data.results.slice(0,n); 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchPopularMovies = async(n) => {
  try {
    const response = await tmdbApi.get("/movie/popular");
    return response.data.results.slice(0, n); 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export const fetchTopRatedMovies = async(n) => {
  try {
    const response = await tmdbApi.get("/movie/top_rated");
    return response.data.results.slice(0, n); 
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
}

export const fetchUpcomingMovies = async(n) => {
  try {
    const response = await tmdbApi.get("/movie/upcoming");
    return response.data.results.slice(0, n); 
  } catch (error) {
    console.error("Error fetching Upcoming movies:", error);
    return [];
  }
}

export const fetchNewReleaseMovies = async(n) => {
  try {
    const response = await tmdbApi.get("/movie/now_playing");
    return response.data.results.slice(0, n); 
  } catch (error) {
    console.error("Error fetching Upcoming movies:", error);
    return [];
  }
}

export default tmdbApi;