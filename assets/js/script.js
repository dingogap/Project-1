// Globals
var movieName;

// Click handler for search button - won't work until the page is fully loaded
$(document).ready(function () {
  $("#search-btn").click(function () {
    movieName = $("#find-movie").val().trim().replaceAll(" ", "%20");
    $("#search-btn").hide();
    firstDataLookup(movieName);
    console.log(movieName);
  });
});

// Event Handler for clicking in the Search Bar
$("#find-movie").click(function () {
    $("#search-btn").show();
    $("#find-movie").val('');
});

// Build the Query String to search for the movie in the OMDB Database
function firstDataLookup(omdbMovieName) {
    var obmdbUrl = "https://www.omdbapi.com/";
    var omdbApiKey = "fe3d393d";
    omdbMovieData = obmdbUrl + "?s=" + omdbMovieName + "&apikey=" + omdbApiKey + "&type=movie";
    firstAPICall(omdbMovieData);
}

function firstAPICall(a) {
    console.log(a)
}
