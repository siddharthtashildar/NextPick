import axios from "axios";



const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_KEY;

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASEURL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});


export const fetchUpcomingMoviesAuthPage = async(n) =>{
  try {
    const response = await tmdbApi.get("/movie/upcoming");
    return response.data.results.slice(0,n); 
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

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