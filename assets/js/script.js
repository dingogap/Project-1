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

function firstDataLookup (a) {
  console.log(a);
}

// Event Handler for clicking in the Search Bar
$("#find-movie").click(function () {
  $("#search-btn").show();
});