import axios from 'axios';
import { API_KEY, BASE_URL, URL_TREND_DAY } from '../constants/api';
import { defaultHeroMarkup } from '../components/hero';

// Function to fetch trending movies from TMDB API
export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(
      `${BASE_URL}${URL_TREND_DAY}?api_key=${API_KEY}`
    );
    const trendingMovies = response.data.results.slice(0, 5);
    return trendingMovies;
  } catch (error) {
    console.error(error);
    defaultHeroMarkup();
  }
}
