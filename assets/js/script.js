// Globals
var movieName;
var movies = [];
var collection = "collection";
var movie_results;

var imdbData1 = {};
var tmdbData1 = [];
var tmdbData2 = [];

// Read Movie Collection from Local Storage
movies = JSON.parse(localStorage.getItem(collection));
if (movies && movies.length>0) {
  $("#view-fav-btn").show();
  $("#remove-fav-btn").show();
}

// Click handler for search button - won't work until the page is fully loaded
$(document).ready(function () {  
  $("#search-btn").click(function () {
    movieName = $("#find-movie").val().trim().replaceAll(" ", "%20");
    $("#search-btn").hide();
    firstDataLookup(movieName);
  });
});

// Event Handler for enter key clicking in the Search Bar
$("#find-movie").on("keypress", function (event) {
  if (event.key === "Enter") {
    $("#search-btn").click();
    $("#add-fav-btn").hide();
  }
});

// Event Handler for clicking in the Search Bar
$("#find-movie").click(function () {
  resetInputs();
  resetModalInputs();
});

// Click Handler for Add To Favourites Button
$("#add-fav-btn").click(function () {  
  if (movies === null) {
    movies = [
      [
        imdbData1.Title,
        imdbData1.imdbID,
        tmdbData1.id,
        dayjs(tmdbData1.release_date).format("DD-MM-YYYY"),
      ],
    ];
  } else {
    movies.push([
      imdbData1.Title,
      imdbData1.imdbID,
      tmdbData1.id,
      dayjs(tmdbData1.release_date).format("DD-MM-YYYY"),
    ]);
    movies.sort();
  }

  localStorage.setItem(collection, JSON.stringify(movies));
    $("#add-fav-btn").hide();
    $("#del-fav-btn").show();
    $("#view-fav-btn").show();
    $("#remove-fav-btn").show();
});

// Click Handler for Delete From Favourites Button - uses IMDB Id to ensure uniqueness
$("#del-fav-btn").click(function () {
    if (movies.length > 0) {
        movies.splice(movies.findIndex(x => x.includes(imdbData1.imdbID)), 1);
        localStorage.setItem(collection, JSON.stringify(movies));
        $("#add-fav-btn").show();
        $("#del-fav-btn").hide();
        if (movies.length === 0) {
            $("#view-fav-btn").hide();
            $("#remove-fav-btn").hide();
        }
    } else {
        $("#del-fav-btn").hide();
        $("#view-fav-btn").hide();
        $("#add-fav-btn").show();
        $("#remove-fav-btn").hide();
    }
});

// Click Handler for View Favourites Button
$(document).ready(function () {
  $("#view-fav-btn").click(function () {
      resetModalInputs();
      $("#modal-header").text("Favourite Movies");
      for (i = 0; i < movies.length; i++) {
          $("#movie-list").append(
              "<button value=" +
              i +
              ' class="fav-btn waves-effect waves-light btn-small">' +
              movies[i][0] + " (" + movies[i][3] + ")" +
              "</button>"
          );
      }
      $(".modal-close").text('Cancel')
      $("#modal").modal();
      $("#modal").modal("open");
      $(".fav-btn").click(function (event) {
          j = event.target.value;
            imdbData1.Title = movies[j][0];
            imdbData1.imdbID = movies[j][1];
            firstDataSave(imdbData1)
            $("#modal").modal("close");
            secondDataLookup(movies[j][1]);
      });
  })
});


// Event Handler for Modal Close
$(".modal-close").click(function (event) {
    resetModalInputs();
    $("#find-movie").val("");
});

// Build the Query String to search for the movie in the OMDB Database
function firstDataLookup(omdbMovieName) {
  var obmdbUrl = "https://www.omdbapi.com/";
  var omdbApiKey = "fe3d393d";
  omdbMovieData =
    obmdbUrl + "?s=" + omdbMovieName + "&apikey=" + omdbApiKey + "&type=movie";
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
      var checkData = data;
      if (checkData.Response === "False") {
        resetModalInputs();
        $("#modal-header").text(
          "We can't find movie you entered: " + $("#find-movie").val().trim()
        );
        $("#movie-list").append(
          '<p class="no-movie">Please check the name of the movie and try again</p>'
        );
        $("#modal").modal();
        $(".modal-close").text("Try Again");
        $("#modal").modal("open");
        return;
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
        $(".modal-close").text("Cancel");
        $("#modal").modal();
        $("#modal").modal("open");
        $(".ml-btn").click(function (event) {
          j = event.target.value;

          $("#find-movie").val("");
          $("#modal").modal("close");
          firstDataSave(imdbMovie[j]);
          secondDataLookup(imdbMovie[j].imdbID);
        });
      } else {
        $("#find-movie").val("");
        firstDataSave(imdbMovie[0]);
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
        $(".collapsible").collapsible();
      });
      var tmdbMovie = data.movie_results;
      if (tmdbMovie.length > 0) {
        secondDataSave(tmdbMovie[0]);
        thirdDataLookup(tmdbMovie[0].id);
      }
    });
}

// Builds the Query String to search for the movie in the TMDB Database
function thirdDataLookup(movieId) {
  var tmdbUrl = "https://api.themoviedb.org/3/movie/";
  var tbdbApiKey = "38b382b8bdab2fa00b44d7c372a94aff";
  tmdbMovieData =
    tmdbUrl +
    movieId +
    "/reviews?language=en-US&page=1&api_key=" +
    tbdbApiKey +
    "&language=en-US&page=1";
  thirdAPICall(tmdbMovieData);
}

// Fetch the data, update display fields and then call the 3rd search
function thirdAPICall(queryString) {
  fetch(queryString, {
    method: "GET",
    credentials: "same-origin",
    redirect: "follow",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var reviews = data.results;
      thirdDataSave(reviews);
    });
}

// Saves IMDB Movie Data to a global variable accessible outside .then
// Pushes data to the web page
function firstDataSave(firstDataReturn) {
  imdbData1 = firstDataReturn;
  $("#imdb-title").text("Name: " + imdbData1.Title);
  $("#imdb-id").text("IMDB Id: " + imdbData1.imdbID);
  $("#add-fav-btn").show();
  console.log(imdbData1);
  isItemInLocalStorage();
}

// Function to check if selected movie is in local storage
function isItemInLocalStorage() {
  if (movies) {
    if (movies.findIndex(x => x.includes(imdbData1.imdbID)) >= 0) {
      $("#add-fav-btn").hide();
      $("#del-fav-btn").show();
    } else {
      $("#add-fav-btn").show();
    }
  } else {
  $("#add-fav-btn").show();
  }
}

// Saves TMDB Movie Data to a global variable accessible outside .then
// Pushes data to the web page
function secondDataSave(secondDataReturn) {
  tmdbData1 = secondDataReturn;
  $("#tmdb-id").text("TMDB Id: " + tmdbData1.id);
  $("#tmdb-release-date").text(
    "Released: " + dayjs(tmdbData1.release_date).format("DD-MM-YYYY")
  );
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

// Saves TMDB Review Data to a global variable accessible outside .then
// Pushes data to the web page
// Updates the Add To and Delete From Favourites Buttons
function thirdDataSave(thirdDataReturn) {
  tmdbData2 = thirdDataReturn;
  if (tmdbData2.length > 3) {
    for (i = 0; i < 3; i++) {
      $("#review" + i + "-title").text(
        "Reviewed by " +
          tmdbData2[i].author +
          " on " +
          dayjs(tmdbData2[i].created_at).format("DD-MM-YYYY")
      );
      $("#review" + i).text(tmdbData2[i].content);
      $("#rev-li" + i).show();
    }
  } else {
    for (i = 0; i < tmdbData2.length; i++) {
      $("#review" + i + "-title").text(
        "Reviewed by " +
          tmdbData2[i].author +
          " on " +
          dayjs(tmdbData2[i].created_at).format("DD-MM-YYYY")
      );
      $("#review" + i).text(tmdbData2[i].content);
      $("#rev-li" + i).show();
    }
  }
  if (tmdbData2.length > 0) {
    $(".review-list").show();
  }
}
/*     if (movies != null) {
        if (isFavourite(imdbData1.Title, imdbData1.imdbID)) {
            $("#add-fav-btn").hide();
            $("#del-fav-btn").show();
        } else {
            $("#add-fav-btn").show();
        }
    } else {
        $("#add-fav-btn").show();
    }
} */

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

  $("#rev-li0").hide();
  $("#rev-li1").hide();
  $("#rev-li2").hide();

  $("#search-btn").show();
  $("#modal-header").text("");

  $("#add-fav-btn").hide();
  $("#del-fav-btn").hide();
}

// Removes buttons created to display movie lists in modals
function resetModalInputs() {
  $("#modal-header").text("");
  $(".ml-btn").remove();
  $(".fav-btn").remove();
}


// Removes all favourites from local storage

$("#remove-fav-btn").click(function (event) {  
  localStorage.removeItem('collection'); 
  movies = [];
  $("#del-fav-btn").hide();
  $("#view-fav-btn").hide();
  $("#add-fav-btn").show();
  $("#remove-fav-btn").hide();
})