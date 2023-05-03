import axios from 'axios';

// const options = { method: 'GET', headers: { accept: 'application/json' } };

// fetch(
//   'https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=f7c358c222822999296700cd3762c5cf',
//   options
// )
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

const axios = require('axios');

axios
  .get(
    'https://api.themoviedb.org/3/trending/all/day?api_key=f7c358c222822999296700cd3762c5cf'
  )
  .then(response => {
    const trending = response.data.results;
    const container = document.getElementById('trending-container');
    const items = trending
      .map(item => {
        const image = item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : 'https://via.placeholder.com/500x750.png?text=No+Image';
        const title = item.title || item.name || 'Untitled';
        const releaseDate = item.release_date || item.first_air_date || 'N/A';
        const overview = item.overview || 'No description available.';

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
      })
      .join('');

    container.innerHTML = items;
  })
  .catch(error => {
    console.error(error);
  });
