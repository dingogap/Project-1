// Globals
var movieName;

var imdbData1 = {};
var tmdbData1 = []

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

// Event Handler for enter key clicking in the Search Bar
$("#find-movie").on("keypress", function (event) {
    if (event.key === "Enter") {
        $("#search-btn").click();
    }
});

// Event Handler for clicking in the Search Bar
$("#find-movie").click(function () {
    resetInputs();
    resetModalInputs()
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

  // Fetch the data, update display fields and then call the 3rd search 
function secondAPICall(queryString) {
    fetch(queryString, {
        method: "GET",
        credentials: "same-origin",
        redirect: "follow",
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $(document).ready(function () {
                $('.collapsible').collapsible();
            });
            var tmdbMovie = data.movie_results;
            if (tmdbMovie.length > 0) {
                secondDataSave(tmdbMovie[0])
                thirdDataLookup(tmdbMovie[0].id);
            }
        });
}

function thirdDataLookup(a) {
    console.log(a)
}


// Saves IMDB Movie Data to a global variable accessible outside .then
// Pushes data to the web page
function firstDataSave(firstDataReturn) {
    imdbData1 = firstDataReturn;
    $("#imdb-title").text("Name: " + imdbData1.Title);
    $("#imdb-id").text("IMDB Id: " + imdbData1.imdbID);
    console.log(imdbData1);
}

// Saves TMDB Movie Data to a global variable accessible outside .then
// Pushes data to the web page
function secondDataSave(secondDataReturn) {
    tmdbData1 = secondDataReturn;
    $("#tmdb-id").text("TMDB Id: " + tmdbData1.id);
    $("#tmdb-release-date").text("Released: " + dayjs(tmdbData1.release_date).format('DD-MM-YYYY'));
    $("#tmdb-overview").text("Overview: " + tmdbData1.overview);
    $("#tmdb-popularity").text("Popularity: " + tmdbData1.popularity);

    var tmdbUserScore = Math.round(tmdbData1.vote_average * 10);
    $("#tmdb-user-score").text("TMDB user score: " + tmdbUserScore + "%");
    $("#poster-path").attr(
        "src",
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2" +
        tmdbData1.poster_path
    );
    console.log(tmdbData1);
    console.log(tmdbData1.vote_average);
}


// Resets all populated elements to default
function resetInputs() {
    $("#find-movie").val("");

    $("#imdb-title").text("");
    $("#tmdb-release-date").text("");
    $("#imdb-id").text("");
    $("#tmdb-id").text("");
    $("#tmdb-user-score").text("");
    $("#tmdb-overview").text("");
    $("#tmdb-popularity").text("");

    $("#poster-path").attr("src", "");
    $("#poster-path").text("");
    
    $("#review0").text("");
    $("#review1").text("");
    $("#review2").text("");

    $("#review0-title").text("");
    $("#review1-title").text("");
    $("#review2-title").text("");

    $(".review-list").hide();

    $(".ml-btn").remove();
    $(".no-movie").remove();

    $("#rev-li0").hide()
    $("#rev-li1").hide()
    $("#rev-li2").hide()

    $("#search-btn").show();
    $("#modal-header").text('');

    $("#add-fav-btn").hide();
    $("#del-fav-btn").hide();
}

// Removes buttons created to display movie lists in modals
function resetModalInputs() {
    $("#modal-header").text('');
    $(".ml-btn").remove();    
}