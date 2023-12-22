var search = document.getElementById("movie-input");
var searchBtn = document.getElementById("search-btn");
var movieInfo = document.getElementById("movie-info");
function DisplayMovieInfo() {
    var requestUrl = "http://www.omdbapi.com/?apikey=e8bcf7cb&t=" + search.value;
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var title = movieInfo.appendChild(document.createElement('li'));
      var releaseDate = movieInfo.appendChild(document.createElement('li'));
      var mainActors = movieInfo.appendChild(document.createElement('li'));
      var revenue = movieInfo.appendChild(document.createElement('li'));
      var plot = movieInfo.appendChild(document.createElement('li'));
      title.textContent = "Title: " + data.Title;
      releaseDate.textContent = "Release Date: " + data.Released;
      mainActors.textContent = "Main Cast: " + data.Actors;
      revenue.textContent = "Box Office Revenue: " + data.BoxOffice;
      plot.textContent = "Plot Summary: " + data.Plot;
  }) }


searchBtn.addEventListener('click', DisplayMovieInfo);
