// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=dca61bcc&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showCards(m);
//       });
//       $(".movie-container").html(cards);
//       // if button detail on click
//       $(".modal-detail-button").on("click", function () {
//         //   console.log($(this).data("imdbid"));
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=dca61bcc&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = showMovieDetail(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (err) => {
//             console.log(err.responseText);
//           },
//         });
//       });
//     },
//     error: (err) => {
//       console.log(err.responseText);
//     },
//   });
// });

// fetch
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + inputKeyword.value)
//     .then((response) => response.json()) //still promise
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((movie) => (cards += showCards(movie)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // when the detail button is clicked
//       const modalDetailButton = document.querySelectorAll(".modal-detail-button");
//       modalDetailButton.forEach((btn) => {
//         // change NodeList to Single Element
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     }); //to run asynchronous
// });

// fetch refactor (async & await)
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&s=" + keyword)
    .then((response) => response.json()) //still promise
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((movie) => (cards += showCards(movie)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// when the detail button is clicked
// event binding (gives an event that doesn't exist initially, but if there is an event it can run )
document.addEventListener("click", async function (el) {
  if (el.target.classList.contains("modal-detail-button")) {
    const imdbid = el.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUIDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=dca61bcc&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showCards(m) {
  return `<div class="col-md-3 my-5">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-outline-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
                </div>
            </div>
          </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md list-group-detail">
                  <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Director: </strong> ${m.Director}</li>
                    <li class="list-group-item"><strong>Actors: </strong> ${m.Actors}</li>
                    <li class="list-group-item"><strong>Country: </strong> ${m.Country}</li>
                    <li class="list-group-item"><strong>Awards: </strong>${m.Awards}</li>
                    <li class="list-group-item"><strong>Plot: </strong><br>${m.Plot}</li>
                  </ul>
                </div>
            </div>
          </div>`;
}
