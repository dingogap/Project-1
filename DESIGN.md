# Movie Search

## Description
Movie Search lets users search the TMDB database for information about movies using a simple web page. Users will be able to save their favourite movies to local storage for quick access in later sessions.

Initially the web page will only display some of the information that is available to the APIs. Each type of information requires its own API call and this increases complexity and development time.

Movie Search as built is considered the minimum viable product.

## Layout

Movie Search will have the following components

1. Responsive Design to work on everything from phones up to large screen computers
2. Header displaying name and later perhaps an icon
3. A Search Field where the Movie Name is entered
4. A Button Bar that only displays the options available at the time
5. A Content Area divided into 3 main sectons
   1. Movie Data
      1. Column 1 - movie information
      2. Column 2 - movie poster
   2. A collaspible row showing upto 3 reviews
   3. A row to display a movie trailer (if available)

Field Titles only display when there is appropriate data to display.

![Movie Search](./assets/images/movieSearch.png)

## Functionality
Movie Search will have the following functionality:
1. Search Input Field
   * users will enter the movie name (full or partial) to be serched for
   * the movie name is not case dependent
   * the Search will start when the Search Button is clicked or when the Enter Key is pressed
2. When a Search is started the web page will
   * remove the Search Button 
   * use the OMDB API to search for the movie name 
   * start loading the movie data immediately if ony 1 is found
   * use a modal to list the hits if more than 1 movie is found
   * show a message when no movie is found
   * data to return:
     * Movie Name
     * IMDB  
3. When a list of movies is displayed in a modal the user can
   * select a movie by clicking on its name
   * press CANCEL to start a new search
4. When a movie is selected by clicking in the modal or it was the only one found
   1. the TMDB API will search for the IMDB Id returned in the 1st search
      * data to return:
        * TMDB Id
        * Release Date
        * Overview
        * Popularity
        * Poster Path
        * more data is available and will be added as time permits    

   2. the TMDB API will search for movie reviews using the TMDB Id returned in the 2nd search
      * data to return:
        * 3 Movie Reviews
   3. the TMDB API will search for trailers useing the TMDB Id returned in the 2nd search 
      * data returned:
        * Movie Trailers
5. Movie data will be displayed in the appropriate panels
6. Buttons in the Button bar will update based on the movie status (favourite/not favourite/favourite list)   
7. Clicking in the Search Bar will clear the current movie data ready for the next search
8. Selecting a movie from the Favourites (in a modal) will clear the current movie and display the next

## Button Bar Navigation
The Button Bar will have these icon buttons:
1. Search - visible when the Search Bar has focus
2. Add To Favourites - visible when the displayed movie is not a favourite
3. Delete From Favourites - visible when the current movie is a favourite
4. View Favourites - visible when there is a least one favourite movie
5. Clear Favourites - visible when there is a least one favourite movie
6. Help - Visible all the time

## Messaging/Communication with User - Modals
Movie Search Hits, Favourites List and Error Messages will be displayed using a Modal. Error messaging only shows a movie not found at this stage but will be updated as other error conditions are discovered. 
1. Movie Search Hits will show
   * Header - with the exact search term entered
   * List of movies found name + release date - each is a clickable and when clicked will get the data
   * CANCEL button
2. Favourites List will show:
   * Header - with the heading Favourite Movies
   * List of movies found (name + release date) - each is a clickable and when clicked will get the data
   * CANCEL button
3. Error Messages will show:
   * Header - staing the problem
   * Appropriate Message
   * Appropriately title button - OK, CANCEL or TRY AGAIN

When Modals are dismissed message content is removed as they close

