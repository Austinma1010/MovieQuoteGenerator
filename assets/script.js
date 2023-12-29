var search = document.getElementById("movie-input");
var searchBtn = document.getElementById("search-btn");
var movieInfo = document.getElementById("movieInfo");
var clearSavedBtn = document.getElementById("clear-saved")

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
      title.setAttribute('class', 'movieTitle');
      releaseDate.textContent = "Release Date: " + data.Released;
      mainActors.textContent = "Main Cast: " + data.Actors;
      revenue.textContent = "Box Office Revenue: " + data.BoxOffice;
      plot.textContent = "Plot Summary: " + data.Plot;
      movieInfo.setAttribute('class', 'movieStyle');
      showWiki();
  })

}

searchBtn.addEventListener('click', function() {
  if (search.value == 0) {
    return;
  } else {
    DisplayMovieInfo();
  }
});

function showWiki() {
  var requestUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + search.value + " movie&limit=1&format=json&formatversion=2";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data[3].includes('https')) {
        
      var wiki = document.getElementById('wiki-btn');
      wiki.setAttribute('href', data[3]);
  
      return;
    }
      else { 
        var requestUrl2 = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + search.value + "&limit=1&format=json&formatversion=2";

  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      wiki = document.getElementById('wiki-btn');
      wiki.setAttribute('href', data[3]);
       
      return;
})

      }
})
}

function clearSavedMovies(event) {
  event.preventDefault;
  localStorage.removeItem("movieName");
};
