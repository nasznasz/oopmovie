function displayMovieDetails(movieId) {
  const movieDetailsUrl = `https://www.omdbapi.com/?apikey=51e2da7e&i=${movieId}`;

  fetch(movieDetailsUrl)
    .then((response) => response.json())
    .then((detailsData) => {
      const movieContainer = document.getElementById(movieId);
      const movieDetailsDiv = movieContainer.querySelector(".movie-details");

      movieDetailsDiv.innerHTML = "";

      const synopsisPara = document.createElement("p");
      synopsisPara.textContent = `Synopsis: ${detailsData.Plot}`;
      movieDetailsDiv.appendChild(synopsisPara);

      const castPara = document.createElement("p");
      castPara.textContent = `Cast and Crew: ${detailsData.Actors}`;
      movieDetailsDiv.appendChild(castPara);

      const releaseDatePara = document.createElement("p");
      releaseDatePara.textContent = `Release Date: ${detailsData.Released}`;
      movieDetailsDiv.appendChild(releaseDatePara);

      const ratingPara = document.createElement("p");
      ratingPara.textContent = `Ratings: ${detailsData.imdbRating}`;
      movieDetailsDiv.appendChild(ratingPara);

      const addToWatchlistButton = document.createElement("button");
      addToWatchlistButton.textContent = "Add to Watchlist";
      addToWatchlistButton.addEventListener("click", function (event) {
        event.stopPropagation();
        addToWatchlist(detailsData);
        addToWatchlistButton.disabled = true;
        addToWatchlistButton.textContent = "Added to Watchlist";
      });
      movieDetailsDiv.appendChild(addToWatchlistButton);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addToWatchlist(movieData) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.push(movieData);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function buttonClicked() {
  var movieTitle = document.getElementById("searchData").value;
  fetch(`https://www.omdbapi.com/?apikey=fc1fef96&s=${movieTitle}`)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.Search;

      if (movies) {
        movies.sort((a, b) => b.Year.localeCompare(a.Year));

        const demoElement = document.getElementById("demo");
        demoElement.innerHTML = "";

        movies.forEach((movie) => {
          const movieId = movie.imdbID;

          const movieContainer = document.createElement("div");
          movieContainer.id = movieId;
          movieContainer.classList.add("movie-container");

          const titlePara = document.createElement("h3");
          titlePara.textContent = movie.Title;
          movieContainer.appendChild(titlePara);

          const posterImg = document.createElement("img");
          posterImg.src = movie.Poster;
          posterImg.alt = movie.Title;
          movieContainer.appendChild(posterImg);

          const movieDetailsButton = document.createElement("button");
          movieDetailsButton.textContent = "Movie Details";
          movieDetailsButton.addEventListener("click", function (event) {
            event.stopPropagation();
            displayMovieDetails(movieId);
            toggleMovieDetails(movieId);
          });
          movieContainer.appendChild(movieDetailsButton);

          const movieDetailsDiv = document.createElement("div");
          movieDetailsDiv.classList.add("movie-details", "collapsed");

          movieContainer.appendChild(movieDetailsDiv);
          movieContainer.addEventListener("click", function () {
            toggleMovieDetails(movieId);
          });

          demoElement.appendChild(movieContainer);
        });
      } else {
        document.getElementById("demo").innerHTML = 'No movies found.';
      }
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("demo").innerHTML = 'Error occurred while fetching data.';
    });
}

function toggleMovieDetails(movieId) {
  const movieContainer = document.getElementById(movieId);
  const movieDetailsDiv = movieContainer.querySelector(".movie-details");
  const isOpen = movieContainer.classList.contains("open");

  const openMovieContainers = document.querySelectorAll(".movie-container.open");
  openMovieContainers.forEach((container) => {
    container.classList.remove("open");
    container.querySelector(".movie-details").classList.add("collapsed");
  });

  if (!isOpen) {
    movieContainer.classList.add("open");
    movieDetailsDiv.classList.remove("collapsed");
  }
}
