// Globals
var movieName;

var imdbData1 = {};

// Click handler for search button - won't work until the page is fully loaded
$(document).ready(function () {
  $("#search-btn").click(function () {
    movieName = $("#find-movie").val().trim().replaceAll(" ", "%20");
    $("#search-btn").hide();
    firstDataLookup(movieName);
  });
});

// Event Handler for clicking in the Search Bar
$("#find-movie").click(function () {
    $("#search-btn").show();
    $("#find-movie").val('');
});

// Event Handler for clicking in the Search Bar
$("#find-movie").on("keypress", function (event) {
    if (event.key === "Enter") {
        $("#search-btn").click();
    }
});

// Build the Query String to search for the movie in the OMDB Database
function firstDataLookup(omdbMovieName) {
    var obmdbUrl = "https://www.omdbapi.com/";
    var omdbApiKey = "fe3d393d";
    omdbMovieData = obmdbUrl + "?s=" + omdbMovieName + "&apikey=" + omdbApiKey + "&type=movie";
    firstAPICall(omdbMovieData);
}

// Fetch the data, update display fields and then call the 2nd search 
function firstAPICall(queryString) {
    fetch(queryString, {
        method: "GET",
        credentials: "same-origin",
        redirect: "follow",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var checkData = data
            if (checkData.Response === "False") {
                /* resetModalInputs(); */
                $("#modal-header").text("We can't find movie you entered: " + $("#find-movie").val().trim());
                $("#movie-list").append(
                    '<p class="no-movie">Please check the name of the movie and try again</p>'
                )
                $("#modal").modal();
                $(".modal-close").text('Try Again')
                $("#modal").modal("open");
                return
            }
            var imdbMovie = data.Search;
            if (imdbMovie.length > 1) {
                var j;
                $("#modal-header").text($("#find-movie").val());
                for (i = 0; i < imdbMovie.length; i++) {
                    $("#movie-list").append(
                        "<button value=" +
                        i +
                        ' class="ml-btn waves-effect waves-light btn-small">' +
                        imdbMovie[i].Title +
                        " (" +
                        imdbMovie[i].Year +
                        ")</button>"
                    );
                }
                $(".modal-close").text('Cancel')
                $("#modal").modal();
                $("#modal").modal("open");
                $(".ml-btn").click(function (event) {
                    j = event.target.value;

                    $("#find-movie").val("");
                    $("#modal").modal("close");
                    firstDataSave(imdbMovie[j])
                    secondDataLookup(imdbMovie[j].imdbID);
                });
            } else {
                $("#find-movie").val("");
                firstDataSave(imdbMovie[0])
                $("#imdb-title").text("Name: " + imdbMovie[0].Title);
                $("#imdb-id").text("IMDB Id: " + imdbMovie[0].imdbID);
                secondDataLookup(imdbMovie[0].imdbID);
            }
            $("#find-movie").val("");
        });
}


// Builds the Query String to search for the movie in the TMDB Database
function secondDataLookup(movieId) {
    var tmdbUrl = "https://api.themoviedb.org/3/";
    var tbdbApiKey = "38b382b8bdab2fa00b44d7c372a94aff";
    tmdbMovieData =
      tmdbUrl +
      "find/" +
      movieId +
      "?api_key=" +
      tbdbApiKey +
      "&external_source=imdb_id";
    secondAPICall(tmdbMovieData);
  }






// Saves IMDB Movie Data to a global variable accessible outside .then
// Pushes data to the web page
function firstDataSave(firstDataReturn) {
    imdbData1 = firstDataReturn;
    $("#imdb-title").text("Name: " + imdbData1.Title);
    $("#imdb-id").text("IMDB Id: " + imdbData1.imdbID);
}




