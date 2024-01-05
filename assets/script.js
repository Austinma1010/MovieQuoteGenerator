var search = document.getElementById("movie-input");
var searchBtn = document.getElementById("search-btn");
var movieInfo = document.getElementById("movieInfo");
var dropDownEl = document.getElementById("drop-down");
//var viewSavedbtn = document.getElementById("view-saved")
var movieNameArray = JSON.parse(localStorage.getItem("movieName")) || [];
var clearSavedBtn = document.getElementById("clear-saved");

function DisplayMovieInfo(name) {
  var requestUrl = "http://www.omdbapi.com/?apikey=e8bcf7cb&t=" + name;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movieInfo.innerHTML = "";
      var title = movieInfo.appendChild(document.createElement("li"));
      var releaseDate = movieInfo.appendChild(document.createElement("li"));
      var mainActors = movieInfo.appendChild(document.createElement("li"));
      var revenue = movieInfo.appendChild(document.createElement("li"));
      var plot = movieInfo.appendChild(document.createElement("li"));
      title.textContent = "Title: " + data.Title;
      title.setAttribute("class", "movieTitle");
      releaseDate.textContent = "Release Date: " + data.Released;
      mainActors.textContent = "Main Cast: " + data.Actors;
      revenue.textContent = "Box Office Revenue: " + data.BoxOffice;
      plot.textContent = "Plot Summary: " + data.Plot;
      movieInfo.setAttribute("class", "movieStyle");
      showWiki(name);
    });
}

searchBtn.addEventListener("click", function () {
  if (search.value == 0) {
    return;
  } else {
    DisplayMovieInfo(search.value);
  }
});

function showWiki(name) {
  var requestUrl =
    "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" +
    name +
    " movie&limit=1&format=json&formatversion=2";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data[3].includes("https")) {
        var wiki = document.getElementById("wiki-btn");
        wiki.setAttribute("href", data[3]);

        return;
      } else {
        var requestUrl2 =
          "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" +
          name +
          "&limit=1&format=json&formatversion=2";

        fetch(requestUrl2)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            wiki = document.getElementById("wiki-btn");
            wiki.setAttribute("href", data[3]);

            return;
          });
      }
    });
}

//save movie title to local storage
$("#save-btn").on("click", function () {
  var newInput = $("#movie-input").val();
  if (!movieNameArray.includes(newInput)) {
    movieNameArray.push(newInput);
    localStorage.setItem("movieName", JSON.stringify(movieNameArray));
  }
  dropDownEl.innerHTML = "";
  viewSaved();
});
//view saved movies via dropdown
function viewSaved() {
  // $('#dropdown-menu4').empty();
  for (var i = 0; i < movieNameArray.length; i++) {
    var savedMovieTit = dropDownEl.appendChild(document.createElement("li"));
    savedMovieTit.setAttribute("class", "dropDownListEl");
    savedMovieTit.textContent = movieNameArray[i];
    savedMovieTit.addEventListener("click", clickSaved);
  }
}

function clickSaved() {
  DisplayMovieInfo(this.textContent);
}
viewSaved();

clearSavedBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("movieName");
  movieNameArray = [];
  dropDownEl.textContent = "";
});
