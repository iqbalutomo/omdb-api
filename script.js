$.ajax({
  url: "http://www.omdbapi.com/?apikey=dca61bcc&s=Harry Potter",
  success: (results) => {
    const movies = results.Search;
    let cards = "";
    movies.forEach((m) => {
      cards += `<div class="col-md-4 my-5">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal">Show Details</a>
            </div>
          </div>
        </div>`;
    });
    $(".movie-container").html(cards);
  },
  error: (err) => {
    console.log(err.responseText);
  },
});
