// ! невірний шлях до файлу стилів
// import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import Swiper from 'swiper/bundle';
// import Swiper, { Navigation, Pagination } from 'swiper';
// import 'swiper/swiper-bundle.min.css';

import { API_KEY, BASE_URL, URL_TREND_DAY } from '../constants/api';
import { ROOT_HERO_CONTAINER } from '../constants/root';
import { fetchTrendingMovies } from '../utils/fetchTrendDay';

//! потрібно буде перемістити в constants/root.js
export const IMG_URL = 'https://image.tmdb.org/t/p/original/';

// Function to create markup for a single movie
function createMovieCardMarkup(movie) {
  const image = movie.poster_path
    ? `${IMG_URL}${movie.backdrop_path}`
    : 'https://via.placeholder.com/500x750.png?text=No+Image';
  const title = movie.title || movie.name || 'Untitled';
  // const releaseDate = movie.release_date || movie.first_air_date || 'N/A';
  const overview = movie.overview || 'No description available.';
  const rating = movie.vote_average || 'No rating';
  const id = movie.id;
  console.log('id:', id);
  const video = movie.video;
  console.log('video:', video);
  console.log('len', overview.length);

  // ! невірний шлях .. знайти в документації
  const trailer = movie.videos;

  return `
    <div class="hero-trend__wrap swiper-slide">
      <div class="hero-trand__image" style="background-image: url('${image}')"></div>
        <div class="hero-trend__info">
          <div class="hero-trend__details" >
            <h2 class="hero-trend__title">${
              title.length > 30 ? title.substring(0, 30) + '...' : title
            }</h2>
            <p class="hero-trend__rating">${
              Math.round(rating * 10) / 10
            } / 10</p>
            <p class="hero-trend__overview">${
              overview.length > 245
                ? overview.substring(0, 245) + '...'
                : overview
            }</p>
            <button class="hero-trend__btn">
              <a href="${BASE_URL}movie/${id}/${video}?api_key=${API_KEY}" class="hero-trend__btn-link">Watch trailer</a>
            </button>
          </div>
        </div>
    </div>
  `;
}

// Function to render trending movies to the DOM
async function renderTrendingMovies() {
  const swiperWrap = document.querySelector('.swiper-wrapper');
  let markup = '';

  try {
    const trendingMovies = await fetchTrendingMovies();

    if (trendingMovies.length === 0) {
      renderOnError();
    }

    trendingMovies.forEach(movie => {
      const movieCardMarkup = createMovieCardMarkup(movie);

      markup += movieCardMarkup;
    });

    swiperWrap.innerHTML = markup;

    // create SWIPER with options
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 50,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<span class="' + className + '">' + 0 + (index + 1) + '</span>'
          );
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      // autoplay: {
      //   delay: 5000,
      //   stopOnLastSlide: false,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // },
    });
  } catch (error) {
    console.error(error);
    defaultHeroMarkup();
  }
}

export function defaultHeroMarkup() {
  ROOT_HERO_CONTAINER.innerHTML = `
      <div class="hero-trend__wrap">
      <div class="hero-trand__image hero-trand__image-back"></div>
        <div class="hero-trend__info">
          <div class="hero-trend__details" >
            <h2 class="hero-trend__title">Let's Make Your Own Cinema</h2>
            <p class="hero-trend__overview">Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
            <button class="hero-trend__btn">
              <a href="./catalog.html" class="hero-trend__btn-link">Get Started</a>
            </button>
          </div>
        </div>
    </div>
  `;
}

// Call renderTrendingMovies to initially render trending movies
renderTrendingMovies();
