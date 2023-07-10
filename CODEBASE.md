# Movie Search Codebase

## Technologies
Movie Search will use the following technologies:
1. HTML - for page layout
2. CSS - page styling
3. JavaScript - coding
4. jQuery - a JavaScript library to handle DOM traversal & manipulation & event handling 
5. Dayjs - a JavaScript library to simplify date manipulation
6. Materialize - CSS framework
7. OMDB API - access the The Open Movie Datbase using API calls and retrieve movie related data 
8. TMDB API - access the The Movie Datbase using API calls and retrieve movie related data 

## Folder Structure
```
├── assets
│   ├── css
│   │   ├── style.css
│   │
│   ├── js
│       ├── script.js  
│
│   │
│   ├── images
│       ├── movieSearch.png 
│
├── index.html
├── README.md
├── DOCO.md
├── CODEBASE.md 
└── .gitignore
```

## Implementation

### HTML
Movie Search will be a simple index.html web page containing:
1. Header Row - Page Title
2. Search Bar - Input Field
3. Button Bar - Search, Add to Favourites, Del from Favourites, View Favourites & Clear Favourites buttons 
4. Content Area comprising 4 panels
    1. Panel 1 holds movie data
    2. Panel 2 holds the movie poster
    3. Panel 3 holds movie reviews
    4. Panel 4 holds a movie trailer (if available)
5. Modal - the modal will list movie hits, favourites list and error messages

### CSS
Most CSS will be handled by Materialize.

Custom modifications will be in styles.css. These might be to adjust button layouts & display properties

### JavaScript
The JavaScript code controls the way Movie Search works.

Movie Search code will be driven by Button Clicks. Button visibility will be controlled by data. The presence or absence of data will control which buttons are visible and can be clicked.

##JavaScript Code Structure

#### Initialisation
The code initialises and stops waiting for event handlers

* Declares global variable
* Loads the Favourites from Local Storage - if successful movies will not be null

### Event Handlers
Event Handlers detect user actions and act according to which button is clicked.

On startup the Search button will always be visible. The View Favourites button will be visible if a movie has been saved to Favourites. These buttons only bacome active when the web page has fully loaded, even if they are visible.

The following Event Handlers have been defined:
* Search Button - click starts the movie search
* Enter Key - clicks the Search Button if the search input field has focus
* Search Input Field - click intop the field and all visible data is cleared
* Add Favourite Button - click adds the current movie to the Favourites list
* Delete from Favourites Button - click to delete the current movie from the Favourites list
* View Favourites Button - click to display the Favourites List in a Modal
* Close Modal Button - click to close the Modal and remove all movie list buttons
* Movie List Buttons - click a movie the Movie hit list returned by search to get that data
* Favourite List Buttons - click a movie the Favourites list to get that data

### API Requests
There are 4 API requests at present.

Each of the 4 API requests is broken into 2 functions, to make the code slightly more readable.

The functions calls are prefixes with first, second third and fourth.


            firstDataLookup     calls   firstAPICall
                                calls   secondDataLookup    calls   secondAPICall
                                calls   thirdDataLookup     calls   thirdAPICall
                                calls   fourthDataLookup    calls   fourthAPICall

The API Queries are asynchronous using the fetch... then... then... structure.
To ensure data has been returned the code that processes that data is implemented within the 'second then' code block.

* first APICall
    * searches the OMDB database for movies matching the data entered in the Search Bar.
        * if only 1 movie is found the data is retrieved immediately
        * if more than 1 movie is found the list is displayed in a modal so the correct movie data can be retrieved
        * IMDB Movie Name and IMDB Id are written to the web page in Panel 1
* 2nd APICall
    * searches the TMDB database for the IMDB Id and retrieves the related movie data
        * TMDB Id, Release Date, Overview, Popularity are written to the web page in Panel 1
        * the Poster Path is used to build the img src so the poster can be displayed in Panel 2
* 3rd APICall
    * searches the TMDB database for the TMDB Id and retrieves 3 movie reviews which are displayed in Panel 3
* 4th APICall
    * searches the TMDB database for the TMDB Id and retrieves 1 movie trailer which is displayed in Panel 4     

### Button Code (in the event handlers)
1. Search Button
    * trims leading and trailing spaces from the search query
    * replaces internal space characters with %20 characters
    * calls the firstDataLookup function
2. Add To Favourites Button
    * creates the movies array if necessary and adds the current movie to the Favourites
    * pushes the current movie to the movies array if it does exist
    * updates Local Storage
    * hides the Add to Favourites Button
    * reveals the Delete From Favourites Button 
3. Delete From Favourites Button
    * deletes the current movie from the movies array
    * updates Local Storage
    * reveals the Add To Favourites Button
    * hides the Delete From Storage Button
    * hides te View Favourites Button if it was the last Favourite 
4. View Favourites
    * displays the Favourites in a Modal so a moovie can be selected
5. Cancel Button (modal)
    * deletes any movie buttons used in the Modal
    * closes the Modal

### isFavourite Function
The isFavouriteFunction checks to see if the current movie is in the Favourites list. It compares the Name and IMDB Id of the current movies with each movie in the Favourites list.
* a flag is set to false.
* the comparison loops through the Favourites comparing the values with the current movie. If it is found the flag is set to true.
* the function returns the flag

### resetInputs Function
This function clears most data populated showing the current movie ready for the next search

### resetModalnputs Function
This function clears data used to display Modals