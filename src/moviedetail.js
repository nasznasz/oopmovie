document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movieId');

  fetch(`https://www.omdbapi.com/?apikey=c1aecf62&i=${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Process the movie details data here
      const movieDetailsContainer = document.getElementById("movieDetails");

      const movieTitle = document.createElement("h2");
      movieTitle.classList.add("movie-title");
      movieTitle.innerHTML = data.Title;
      movieDetailsContainer.appendChild(movieTitle);

      const moviePoster = document.createElement("img");
      moviePoster.classList.add("movie-poster");
      moviePoster.src = data.Poster;
      movieDetailsContainer.appendChild(moviePoster);

      const movieYear = document.createElement("p");
      movieYear.classList.add("movie-year");
      movieYear.innerHTML = `<strong>Year:</strong> ${data.Year}`;
      movieDetailsContainer.appendChild(movieYear);

      const movieGenre = document.createElement("p");
      movieGenre.classList.add("movie-genre");
      movieGenre.innerHTML = `<strong>Genre:</strong> ${data.Genre}`;
      movieDetailsContainer.appendChild(movieGenre);

      const moviePlot = document.createElement("p");
      moviePlot.classList.add("movie-plot");
      moviePlot.innerHTML = `<strong>Plot:</strong> ${data.Plot}`;
      movieDetailsContainer.appendChild(moviePlot);

      const movieDirector = document.createElement("p");
      movieDirector.classList.add("movie-director");
      movieDirector.innerHTML = `<strong>Director:</strong> ${data.Director}`;
      movieDetailsContainer.appendChild(movieDirector);

      const movieActors = document.createElement("p");
      movieActors.classList.add("movie-actors");
      movieActors.innerHTML = `<strong>Actors:</strong> ${data.Actors}`;
      movieDetailsContainer.appendChild(movieActors);

      // Fetch related movies
      fetch(`https://www.omdbapi.com/?apikey=c1aecf62&s=${encodeURIComponent(data.Title)}`)
        .then((response) => response.json())
        .then((data) => {
          const movies = data.Search;

          if (movies) {
            const relatedMoviesContainer = document.getElementById("relatedMovies");

            movies.forEach((movie) => {
              const movieDiv = document.createElement("div");
              movieDiv.classList.add("related-movie-container");

              const movieTitle = document.createElement("h3");
              movieTitle.classList.add("related-movie-title");
              movieTitle.textContent = movie.Title;
              movieDiv.appendChild(movieTitle);

              const movieYear = document.createElement("p");
              movieYear.classList.add("related-movie-year");
              movieYear.textContent = `Year: ${movie.Year}`;
              movieDiv.appendChild(movieYear);

              const movieID = document.createElement("p");
              movieID.classList.add("related-movie-id");
              movieID.textContent = `Movie ID: ${movie.imdbID}`;
              movieDiv.appendChild(movieID);

              const moviePoster = document.createElement("img");
              moviePoster.classList.add("related-movie-poster");
              moviePoster.src = movie.Poster;
              movieDiv.appendChild(moviePoster);

              relatedMoviesContainer.appendChild(movieDiv);
            });
          }
        });
    });
});
