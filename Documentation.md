# MapViewer Component Documentation
Initializes the below components (ScrollBar, Map, TabBar, and Scale) and handles their state if needed 

### State handlers
* [currentYear, setCurrentYear]: Handles the year being set by ScrollBar
* [currentTab, setCurrentTab]: Handles the tab being set by TabBar
* [currentSpeed, setCurrentSpeed]: Handles the speed of the ScrollBar's scroll
* [isPlaying, setIsPlaying]: Handles whether or not the ScrollBar is passively scrolling

# Scroll Bar Component Documentation
The scroll bar is a React component that is designed to allow the user to control the time-based scroll functionality of our program. It includes a scroll bar, a pause button and forward and backward buttons that the user can operate to change the year they want to be displayed.

### Props
* currentYear (Date): contains the value of the year being displayed on the scroll bar
* setCurrentYear (function): A function to update the current year when the user interacts with the slider or buttons
* currentSpeed (number): value of the current speed the playback is running at
* setCurrentSpeed (function): a function to update the playback speed when user interacts with the speed buttons
* isPlaying (boolean): a flag to indicate if the playback is playing or paused
* setIsPlaying (function): a function to toggle the play/pause state

### useEffect hook
the useEffect hook manages the interval for the automatic year incrementation when playback is active. The currentSpeed sets the interval and it is cleared when the playback is paused or when the slider reaches the end.

### event handlers
* onYearChange (function): updates the current year when there is user interaction
* onSpeedChange (function): updates the playback speed when there is user interaction
* playPause (function): updates the play/pause state when the play/pause button is clicked
* decrementYear (function): Decreases the displayed year by one when the user clicks the corresponding button
* incrementYear (function): increases the displayed year by one when the user clicks the corresponding button

### UI components
* Year slider: allows the user to drag the slider through a specified year range
* Current Year Display: displays the current year obtained from the slider or buttons
* Current Month Display: displays the current month based on the slider and buttons
* Control Buttons: includes buttons for incrementing and decrementing the year, pausing the playback, and adjusting the playback speed

# Map Component Documentation
The map is a component that displays an svg image of a chloropleth map. This map is changed by year (provided as state from the scroll bar) and parameter
(provided as state from the tab bar). The background counties are colored in based on a scale (described in the scale component) and depending on their
values received from the NOAA data.

### Props
* year (Date): A piece of state from the ScrollBar passed as a prop through MapViewer that is used to grab different values from the data in the map display
* width (number): A value that defines the width of the map
* height (number): A value that defines the height of the map
* geoData (array as a geoJSON feature collection): Array of latitudes and longitudes that define the United States counties for the map's background
* currentTab (String): Provides a parameter state from the tab bar that allows for the display of different pieces of data (can be PRCP, TMAX, TMIN, or SNOW)

### event handler
* The title component in the path allows for an onHover effect that displays the name of the county, state, and current year's value being hovered over

### UI component
* Map display: displays the whole svg image including the counties as a background, colored in according to the value of the county on the current year

# TabBar Component Documentation
The TabBar component acts as a way for the user to control which parameter is being viewed on the map. These parameters include PRCP, TMAX, TMIN, and SNOW

### Props
* currentTab (String): A piece of state handled by the MapViewer acts as a parameter to decide which tab is active
* setCurrentTab (function): A function that changes the piece of state currentTab as needed (onClick of a new tab)

### event handler
* Button's onClick: Listens for clicks of the buttons corresponding to individual parameters. When that click is fired, currentTab will change to that parameter.

### UI components
* Parameter buttons: The individual tabs that can be clicked on to change the state of the map

# Scale Component Documentation
The scale creates a color key for the values displayed on the map based on a given parameter.

### Props
* currentTab (String): Piece of state changed by TabBar and handled by MapViewer; decides which color scale to use

### State handlers
* [scaleGradient, setScaleGradient]: Handles the colors of the linear gradient displayed in the scale and used by the map 
* [keyValues, setKeyValues]: Handles the integer values of the key that will be displayed alongside the gradient

### UI component
* Scale display: displays a key in the form of a color gradient, matching the numbers of the scale alongside the gradient