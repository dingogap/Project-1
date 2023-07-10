# Movie Search Test Plan

## Description

Movie Search is an interactive web page that allows a user to
* type a movie name into a text field
* search for the movie
* add the movie to a Favourites collection
* view the Favourites
* select a movie from Favourites
* delete the movie from the Favourities collection
* delete the entire Favourites collection

Once the movie name has been entered the user controls the web page actions with the buttons in the button bar.

##Action and Expected Result

1. Page Load
   * Wwen the web page first loads only Help Button should be visible
   * if a movie has been added to Favourites then the the View Favourites, Delete ALL Favourites and Help buttons should be visible

2. Click in Movie Name input field
    * when a user clicks in the Movie Name Input Field the input field gets focus
    * if movie details are displayed when the user clicks in the input field the details are cleared


3. Movie Name Entry

    * when a user types in the input field the text they type is displayed
    * when the user presses enter when the Movie Name input field has focus the movie search begins
    * when the user clicks the Search Button when the Movie Name input field has focus the movie search begins

4. Search Action

    * a message is displayed in a Modal if the movie cannot be found        
        * if the user presses Escape or clicks 'Try Again' the Modal will close and the input field will clear
    * if the Movie is unique the movie details are displayed
    * if more than one movie is found a list of 'found movies' will be displayed in a Modal
        
        * if the user clicks on a movie name the movie details will be displayed
        * if the user clicks 'Cancel' the Modal will close and the input field will clear
5. When a Movie is Found (from Search or from Favourites List)    
    * available Movie Details will be displayed
    * the Movie Poster will be displayed, if available
    * up to 3 Reviews will be displayed, if available
        
        * clicking on a Review will open the collapsible panel to display the Review 
    * a Trailer will be displayed, if available

        * clicking the Play Button will play the trailer
        * clicking the Full Screen button will display the video full screen  
    * the Add To Favourites button will be displayed if the Movie is not a Favourite
    * the Delete From Favourites Button will be displayed if the movie is a Favourite
6. Clicking the Add To Favourites button

    * will add the current movie to the Favoourites Collection
    * hide the Add To Favourites button
    * reveal the View Favourites button if this was the 1st movie added to the Favourites Collection
    * reveal the Delete ALL Favourites button if this was the 1st movie added to the Favourites Collection
    * reveal the Delete From Favourites button
7. Clicking the Delete From Favourites button will

    * delete the current movie from the Favourites Collection
    * hide the Delete From Favourites button
    * hide the View Favourites button if this was the last movie in the Favourites Collection
    * hide the Delete ALL Favourites button if this was the last movie in the Favourites Collection
    * reveal the Add To Favourities button
8. Clicking the View Favourites button
    
    * will hide the Search button 
    * will display a Modal with a list of all movies in the Favbourites Collection
        
        * clicking a movie from the list of movies will display that movies information
        * clicking Cancel will simply close the Modal
9. Clicking the Delete ALL Favourites button

    * will delete the Favourites Collection
    * if movie details are currently displayed

        * hide the Delete All Favoourites button
        * hide the View Favourites button
        * hide the Delete Favourite Button
        * reveal the Add To Favourites button
    * if no movie details are displayed

        * hide the Delete All Favoourites button
        * hide the View Favourites button
10. Clicking the Help Button will display a Modal showing informaton about each button








