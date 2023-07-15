// watchlist.js

document.addEventListener('DOMContentLoaded', () => {
  renderWatchlist();
});

function renderWatchlist() {
  const watchlistContainer = document.getElementById('watchlist');
  const watchlist = getWatchlistFromLocalStorage();

  watchlistContainer.innerHTML = '';

  if (watchlist.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('watchlist-empty');
    emptyMessage.textContent = 'Your watchlist is empty.';
    watchlistContainer.appendChild(emptyMessage);
  } else {
    watchlist.forEach((movie) => {
      fetchMovieDetails(movie.imdbID)
        .then((movieData) => {
          const movieItem = createMovieItem(movieData, movie);
          watchlistContainer.appendChild(movieItem);
        })
        .catch((error) => {
          console.log('Error fetching movie details:', error);
        });
    });
  }
}

function fetchMovieDetails(movieId) {
  return fetch(`https://www.omdbapi.com/?apikey=c1aecf62&i=${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === 'True') {
        return data;
      } else {
        throw new Error(data.Error);
      }
    });
}

function createMovieItem(movie, watchlistItem) {
  const movieItem = document.createElement('div');
  movieItem.classList.add('watchlist-movie');

  const movieTitle = document.createElement('span');
  movieTitle.classList.add('watchlist-movie-title');
  movieTitle.textContent = movie.Title;
  movieItem.appendChild(movieTitle);

  const moviePoster = document.createElement('img');
  moviePoster.classList.add('watchlist-movie-poster');
  moviePoster.src = movie.Poster;
  movieItem.appendChild(moviePoster);

  const movieYear = document.createElement('span');
  movieYear.classList.add('watchlist-movie-year');
  movieYear.textContent = movie.Year;
  movieItem.appendChild(movieYear);

  const removeButton = document.createElement('button');
  removeButton.classList.add('watchlist-remove-button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => removeFromWatchlist(watchlistItem));
  movieItem.appendChild(removeButton);

  const updateButton = document.createElement('button');
  updateButton.classList.add('watchlist-update-button');
  updateButton.textContent = watchlistItem.watched ? 'Watched' : 'Update';
  updateButton.addEventListener('click', () => updateMovieDetails(watchlistItem));
  movieItem.appendChild(updateButton);

  return movieItem;
}

function getWatchlistFromLocalStorage() {
  const watchlistJSON = localStorage.getItem('watchlist');
  return watchlistJSON ? JSON.parse(watchlistJSON) : [];
}

function saveWatchlistToLocalStorage(watchlist) {
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

function removeFromWatchlist(movie) {
  let watchlist = getWatchlistFromLocalStorage();
  const updatedWatchlist = watchlist.filter((item) => item.imdbID !== movie.imdbID);
  saveWatchlistToLocalStorage(updatedWatchlist);
  alert('Movie removed from watchlist!');
  renderWatchlist();
}

function updateMovieDetails(movie) {
  const watchlist = getWatchlistFromLocalStorage();
  const updatedWatchlist = watchlist.map((item) => {
    if (item.imdbID === movie.imdbID) {
      item.watched = !item.watched;
    }
    return item;
  });
  saveWatchlistToLocalStorage(updatedWatchlist);
  alert('Movie details updated!');
  renderWatchlist();
}
