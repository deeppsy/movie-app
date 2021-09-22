const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const searchURL =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMG_PATH = "https://image.tmdb.org/t/p/w300";

const main = document.querySelector("main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

// Get popular movies immediately

getMovies(API_URL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
}

// HELPER FUNCTIONS

function showMovies(movies) {
  // clear the main first
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `
                <img src="${IMG_PATH + poster_path}" alt="${
      movie.original_title
    }">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class = "${getClassByRate(
                      vote_average
                    )}">${vote_average}</span>
                </div>
                <div class = "overview">
                      <h4>Overview</h4>
                      <p>${overview}</p>
                </div>
        `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5 && rate < 8) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(searchURL + searchTerm);

    search.value = "";
  }
});
