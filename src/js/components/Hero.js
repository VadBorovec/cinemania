import axios from 'axios';
// import Swiper from 'swiper';
// import 'swiper/css/swiper.min.css';
import { API_KEY, BASE_URL, URL_TREND_DAY } from '../constants/api';
import { ROOT_HERO_CONTAINER } from '../constants/root';
import { fetchTrendingMovies } from '../utils/fetchTrendDay';

// import '../../sass/components/Hero.scss';

// const swiper = new Swiper('.swiper-container', {
//   slidesPerView: 1,
//   spaceBetween: 30,
//   loop: true,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
// });

// Function to create markup for a single movie
function createMovieCardMarkup(movie) {
  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';
  const title = movie.title || movie.name || 'Untitled';
  const releaseDate = movie.release_date || movie.first_air_date || 'N/A';
  const overview = movie.overview || 'No description available.';
  const rating = movie.rating || 'No rating';
  // const movieId = movie.movie_id;
  // const trailer = movie.videos;

  return `
    <div class="hero-trend__wrap">
      <div class="hero-trand__image" style="background-image: url('${image}')"></div>
        <div class="hero-trend__info">
          <div class="hero-trend__details" >
            <h2 class="hero-trend__title">${title}</h2>
            <p class="hero-trend__rating">${rating}</p>
            <p class="hero-trend__overview">${overview}</p>
            <button class="hero-trend__btn">Watch trailer</button>
          </div>
        </div>
      
    </div>
  `;
}

// Function to render trending movies to the DOM
async function renderTrendingMovies() {
  ROOT_HERO_CONTAINER.innerHTML = '';

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  try {
    const trendingMovies = await fetchTrendingMovies();

    if (trendingMovies.length === 0) {
      renderOnError();
      // throw new Error('No data returned from the server.');
    }

    trendingMovies.forEach(movie => {
      const movieCardMarkup = createMovieCardMarkup(movie);

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      swiperSlide.innerHTML = movieCardMarkup;

      swiperWrapper.appendChild(swiperSlide);
    });

    swiperContainer.appendChild(swiperWrapper);
    ROOT_HERO_CONTAINER.appendChild(swiperContainer);

    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } catch (error) {
    console.error(error);
    renderOnError();
  }
}

export function renderOnError() {
  ROOT_HERO_CONTAINER.innerHTML = `
    <div class="hero-trend__wrap">
      <img src="https://via.placeholder.com/500x750.png?text=No+Image" alt="Let's Make Your Own Cinema">
      <div class="hero-trend__details">
        <h2 class="hero-trend__title">Let's Make Your Own Cinema</h2>
        <p class="hero-trend__overview">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
        <button class="hero-trend__btn">Get Started</button>
      </div>
    </div>
  `;
}

// Call renderTrendingMovies to initially render trending movies
renderTrendingMovies();
