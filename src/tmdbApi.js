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

export const fetchMovieById = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "videos,credits", // Fetch trailers & cast info
      },
    });
    return response.data; // Return movie details
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
};

export const fetchLanguageName = (code) => {
  const languageMap = {
    en: "English",
    fr: "French",
    hi: "Hindi",
    es: "Spanish",
    de: "German",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    ru: "Russian",
    ar: "Arabic",
    pt: "Portuguese",
    nl: "Dutch",
    tr: "Turkish"
    // Add more languages as needed
  };

  return((languageMap[code] || code).toUpperCase()) ;
  // try {
  //   const response = await fetch(`https://restcountries.com/v3.1/lang/${code}`);
  //   const data = await response.json();
  //   return data[0]?.languages[code] || "Unknown";
  // } catch (error) {
  //   console.error("Error fetching language:", error);
  //   return "Unknown";
  // }
};

// export const fetchMovieTrailer = async (movieId) => {
//   try {

//     const response = await tmdbApi.get(`/movie/${movieId}/videos`);

//     console.log("Movie Videos API Response:", response.data.results); // Debugging

//     //Find the first trailer (or teaser if no trailer exists)
//     const trailer = response.data.results.find(
//       (video) =>
//         (video.type === "Trailer" || video.type === "Teaser") &&
//         video.site === "YouTube"
//     );

//     // const trailer = response.data.results.find((video) => video.site === "YouTube");

//     return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
//   } catch (error) {
//     console.error("Error fetching trailer:", error);
//     return null;
//   }
// };

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    
    console.log("Movie Videos API Response:", response.data.results); // Debugging

    const trailer = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&rel=0` : null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};
// tmdbApi.js
export const searchMovies = async (query, page = 1, filters = {}) => {
  try {
    const useDiscover =
      filters.genreIds?.length ||
      filters.language ||
      filters.keywordId ||
      filters.actorId;

    const endpoint = useDiscover ? "/discover/movie" : "/search/movie";

    const params = {
      page,
      include_adult: false,
    };

    if (useDiscover) {
      if (filters.genreIds?.length) {
        params.with_genres = filters.genreIds.join(",");
      }
      if (filters.language) {
        params.with_original_language = filters.language;
      }
      if (filters.keywordId) {
        params.with_keywords = filters.keywordId;
      }
      if (filters.actorId) {
        params.with_cast = filters.actorId;
      }
      if (query) {
        // Optional: add title filter when searching via discover
        params.query = query;
      }
    } else {
      params.query = query;
    }

    const response = await tmdbApi.get(endpoint, { params });

    return {
      results: response.data.results || [],
      totalPages: response.data.total_pages || 1,
    };
  } catch (error) {
    console.error("Error searching movies:", error);
    return {
      results: [],
      totalPages: 1,
    };
  }
};


export const fetchDiscoverMovies = async ({ genreId, keyword, minVote = 6, releaseYear = 2015, page = 1 }) => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        include_adult: false,
        page,
        with_keywords: keyword,
        "vote_average.gte": minVote,
        "primary_release_date.gte": `${releaseYear}-01-01`,
        with_original_language: "en", // Exclude Japanese/Korean etc.
        without_genres: "16",         // 16 = Animation genre
        language: "en-US",
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching discovered movies:", error);
    return [];
  }
};

export const getGenres = async () => {
  const response = await tmdbApi.get("/genre/movie/list", {
    params: { language: "en-US" },
  });
  return response.data.genres;
};

export const getLanguages = async () => {
  const response = await tmdbApi.get("/configuration/languages");
  return response.data;
};

export const searchActors = async (query) => {
  const response = await tmdbApi.get("/search/person", {
    params: { query },
  });
  return response.data.results;
};

export const searchKeywords = async (query) => {
  const response = await tmdbApi.get("/search/keyword", {
    params: { query },
  });
  return response.data.results;
};






export default tmdbApi;