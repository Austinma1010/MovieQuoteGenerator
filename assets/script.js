var search = document.getElementById('movie-list');

function DisplayMovieInfo() {
    var requestUrl = "http://www.omdbapi.com/?apikey=e8bcf7cb&t=" + search.value;
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
  }) }

