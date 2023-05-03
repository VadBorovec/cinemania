import axios from 'axios';
// import Swiper from 'swiper';
// import 'swiper/css/swiper.min.css';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f7c358c222822999296700cd3762c5cf';

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// Function to fetch trending movies from TMDB API
async function fetchTrendingMovies() {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/all/week?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    onError();
  }
}

// Function to create markup for a single movie
function createMovieCardMarkup(movie) {
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';
  const title = movie.title || movie.name || 'Untitled';
  const releaseDate = movie.release_date || movie.first_air_date || 'N/A';
  const overview = movie.overview || 'No description available.';

  return `
    <div class="trending-item">
      <img src="${image}" alt="${title}">
      <div class="trending-item-details">
        <h2 class="trending-item-title">${title}</h2>
        <p class="trending-item-release-date">Released on: ${releaseDate}</p>
        <p class="trending-item-overview">${overview}</p>
      </div>
    </div>
  `;
}

// Function to render trending movies to the DOM
async function renderTrendingMovies() {
  const trendingContainer = document.querySelector('#trending-container');
  trendingContainer.innerHTML = '';

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  try {
    const trendingMovies = await fetchTrendingMovies();

    if (trendingMovies.length === 0) {
      throw new Error('No data returned from the server.');
    }

    trendingMovies.forEach(movie => {
      const movieCardMarkup = createMovieCardMarkup(movie);

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      swiperSlide.innerHTML = movieCardMarkup;

      swiperWrapper.appendChild(swiperSlide);
    });

    swiperContainer.appendChild(swiperWrapper);
    trendingContainer.appendChild(swiperContainer);

    const swiper = new Swiper('.swiper-container', {
      // Add your Swiper options here
    });
  } catch (error) {
    console.error(error);
    onError();
  }
}

function onError() {
  const trendingContainer = document.getElementById('trending-container');
  trendingContainer.innerHTML = `
    <div class="trending-item">
      <img src="https://via.placeholder.com/500x750.png?text=No+Image" alt="Let's Make Your Own Cinema">
      <div class="trending-item-details">
        <h2 class="trending-item-title">Let's Make Your Own Cinema</h2>
        <p class="trending-item-release-date">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
        <button class="get-started-button">Get Started</button>
      </div>
    </div>
  `;
}

// Call renderTrendingMovies to initially render trending movies
renderTrendingMovies();
