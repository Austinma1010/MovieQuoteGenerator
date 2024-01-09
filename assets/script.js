var search = document.getElementById("movie-input");
var searchBtn = document.getElementById("search-btn");
var movieInfo = document.getElementById("movieInfo");
var dropDownEl = document.getElementById("drop-down");
//var viewSavedbtn = document.getElementById("view-saved")
var movieNameArray = JSON.parse(localStorage.getItem("movieName")) || [];
var clearSavedBtn = document.getElementById("clear-saved");

function DisplayMovieInfo(name) { // Pulls OMBD info for whatever movie name is entered as an argument
  var requestUrl = "https://www.omdbapi.com/?apikey=e8bcf7cb&t=" + name; // Appends movie name into API URL

  fetch(requestUrl) // creates a fetch request for OMBD info
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      movieInfo.innerHTML = ""; // clears past search data from movie info section
      var title = movieInfo.appendChild(document.createElement("li")); // creates a list element that stores the movies title
      var releaseDate = movieInfo.appendChild(document.createElement("li")); // creates a list element that stores the movies release date
      var mainActors = movieInfo.appendChild(document.createElement("li")); // creates a list element that stores the movies main actors
      var revenue = movieInfo.appendChild(document.createElement("li")); // creates a list element that stores the movies revenue
      var plot = movieInfo.appendChild(document.createElement("li")); // creates a list element that stores the movies plot
      title.textContent = "Title: " + data.Title; // adds text to title list element
      title.setAttribute("class", "movieTitle"); // adds styling to title list element
      releaseDate.textContent = "Release Date: " + data.Released; // adds text to release date list element
      mainActors.textContent = "Main Cast: " + data.Actors; // adds text to main actors list element
      revenue.textContent = "Box Office Revenue: " + data.BoxOffice; // adds text to revenue list element
      plot.textContent = "Plot Summary: " + data.Plot; // adds text to plot list element
      movieInfo.setAttribute("class", "movieStyle"); // adds styling to entire list
      showWiki(name); // calls the funtion showWiki
    });
}

searchBtn.addEventListener("click", function () { // males 'search' button clickable
  if (search.value == 0) { // checks if search bar is blank
    return;
  } else {
    DisplayMovieInfo(search.value);
  }
});

function showWiki(name) { // adds wiki link to the 'More info!' button
  var requestUrl =
    "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" +
    name +
    " movie&limit=1&format=json&formatversion=2";

  fetch(requestUrl) // makes fetch request to wiki API
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data[3].includes("https")) { // checks to make sure response is a link
        var wiki = document.getElementById("wiki-btn"); // grabs 'More Info!' button element
        wiki.setAttribute("href", data[3]); // adds a link to the button

        return;
      } else { // Makes a less specific request
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


$("#save-btn").on("click", function () { //save movie title to local storage
  var newInput = $("#movie-input").val(); // grabs user input
  if (!movieNameArray.includes(newInput)) { // checks if movie has already been saved
    movieNameArray.push(newInput); // adds movie name to the list of saved movies
    localStorage.setItem("movieName", JSON.stringify(movieNameArray)); // saves list to local storage
  }
  dropDownEl.innerHTML = ""; // clears dropdown so that its refreshed with every save
  viewSaved(); // calls viewSaved function 
});

function viewSaved (){ // shows saved movies in dropdown menu

  for (var i=0; i < movieNameArray.length; i++){ // for loop cycles through all elements of list in local storage
  
    var savedMovieTit = dropDownEl.appendChild(document.createElement('li')); // creates list element to display saved movie
    savedMovieTit.setAttribute('class', "dropDownListEl"); // adds styling to saved movie list element
    savedMovieTit.textContent = movieNameArray[i]; // adds text to list element
    savedMovieTit.addEventListener("click", clickSaved); // Makes saved movie titles clickable
  }
}

function clickSaved() { // Makes clicking on saved movies show the info for that movie
  DisplayMovieInfo(this.textContent); // grabs text content of clicked element and submits it to DisplayMovieInfo funtion as an argument
}
viewSaved();

clearSavedBtn.addEventListener("click", function (event) { // clears out saved movies
  event.preventDefault();
  localStorage.removeItem("movieName"); // removes saved movies list from local storage
  movieNameArray = []; // emptys out saved movie array
  dropDownEl.textContent = ""; // removes dropdown list elements
});
