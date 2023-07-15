document.addEventListener("DOMContentLoaded", function() {
  fetchLatestMovies();
  fetchLatestMoviesWithDetails();
});

function fetchLatestMovies() {
  var url = "http://www.omdbapi.com/";
  var apiKey = "51e2da7e";
  var params = {
    apikey: apiKey,
    s: "movie",
    type: "movie",
    y: "2022" && "2023",
    r: "json"
  };

  var queryString = Object.keys(params).map(function(key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
  }).join("&");

  var requestUrl = url + "?" + queryString;

  fetch(requestUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.Error) {
        console.log("Error:", data.Error);
        return;
      }

      var movies = data.Search || [];
      var moviesList = document.getElementById("movies-list");

      movies.forEach(function(movie) {
        var title = movie.Title || "";
        var year = movie.Year || "";
        var imdbID = movie.imdbID || "";

        var listItem = document.createElement("li");
        listItem.innerHTML = `
          <div class="movie-container">
            <span class="movie-title">${title}</span>
            <img class="movie-poster" src="${movie.Poster}" alt="${title} Poster">
            <span class="movie-details">Year: ${year}</span>
            <a class="movie-details-link" href="moviedetail.html?movieId=${imdbID}">Movie Details</a>
            <button class="add-to-watchlist-button" onclick="addToWatchlist('${imdbID}', '${title}', '${year}')">Add to Watchlist</button>
          </div>
        `;
        moviesList.appendChild(listItem);
      });
    });
}

function fetchMovieDetails(movieId) {
  return fetch(`https://www.omdbapi.com/?apikey=51e2da7e&i=${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        return data;
      } else {
        throw new Error(data.Error);
      }
    });
}

function createMovieDiv(movie) {
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie-container");

  const titleSpan = document.createElement("span");
  titleSpan.classList.add("movie-title");
  titleSpan.textContent = movie.Title;
  movieDiv.appendChild(titleSpan);

  const posterImg = document.createElement("img");
  posterImg.classList.add("movie-poster");
  posterImg.src = movie.Poster;
  movieDiv.appendChild(posterImg);

  const detailSpan = document.createElement("span");
  detailSpan.classList.add("movie-details");
  detailSpan.textContent = `Year: ${movie.Year}`;
  movieDiv.appendChild(detailSpan);

  const movieDetailsLink = document.createElement("a");
  movieDetailsLink.classList.add("movie-details-link");
  movieDetailsLink.textContent = "Movie Details";
  movieDetailsLink.href = `moviedetail.html?movieId=${movie.imdbID}`;
  movieDiv.appendChild(movieDetailsLink);

  const addToWatchlistButton = document.createElement("button");
  addToWatchlistButton.classList.add("add-to-watchlist-button");
  addToWatchlistButton.textContent = "Add to Watchlist";
  movieDiv.appendChild(addToWatchlistButton);

  addToWatchlistButton.addEventListener("click", () => {
    addToWatchlist(movie);
  });

  return movieDiv;
}

function addToWatchlist(imdbID, title, year) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  const existingMovie = watchlist.find((item) => item.imdbID === imdbID);
  if (!existingMovie) {
    const movie = {
      imdbID: imdbID,
      Title: title,
      Year: year
    };
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Movie added to watchlist!");

    window.location.href = "watchlist.html";
  } else {
    alert("Movie is already in the watchlist!");
  }
}
