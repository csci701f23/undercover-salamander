# REACT DOCUMENTATION:

# MapViewer Component Documentation
Initializes the below components (ScrollBar, Map, TabBar, and Scale) and handles their state if needed.

### State handlers
* [currentYear, setCurrentYear]: Handles the year being set by ScrollBar
* [currentTab, setCurrentTab]: Handles the tab being set by TabBar
* [currentSpeed, setCurrentSpeed]: Handles the speed of the ScrollBar's scroll
* [isPlaying, setIsPlaying]: Handles whether or not the ScrollBar is passively scrolling

# ScrollBar Component Documentation
The scroll bar is a React component that is designed to allow the user to control the time-based scroll functionality of our program. It includes a scroll bar, a pause button and forward and backward buttons that the user can operate to change the year they want to be displayed.

### Props
* currentYear (Date): contains the value of the year being displayed on the scroll bar
* setCurrentYear (function): A function to update the current year when the user interacts with the slider or buttons
* currentSpeed (number): value of the current speed the playback is running at
* setCurrentSpeed (function): a function to update the playback speed when user interacts with the speed buttons
* isPlaying (boolean): a flag to indicate if the playback is playing or paused
* setIsPlaying (function): a function to toggle the play/pause state

### useEffect hook
The useEffect hook manages the interval for the automatic year incrementation when playback is active. The currentSpeed sets the interval and it is cleared when the playback is paused or when the slider reaches the end.

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
The map is a component that displays an svg image of a chloropleth map. This map is changed by year (provided as a state from the scroll bar) and parameter
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
The TabBar component acts as a way for the user to control which parameter is being viewed on the map. These parameters include PRCP, TMAX, TMIN, and SNOW.

### Props
* currentTab (String): A piece of state handled by the MapViewer acts as a parameter to decide which tab is active
* setCurrentTab (function): A function that changes the piece of state currentTab as needed (onClick of a new tab)

### event handler
* Button's onClick: Listens for clicks of the buttons corresponding to individual parameters. When that click is fired, currentTab will change to that parameter

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

# PYTHON DOCUMENTATION:

# NOAAToJSON_Serial Documentation
A serial approach to creating the JSON data for the map by aggregating data from NOAA and averaging by county.

### Props
* param (String): Defines which parameter data will be gathered for (PRCP, TMAX, TMIN, SNOW)

### Functions
* processAllStations (param : String) : void: The highest function in the class; this function calls the other functions to aggregate and write data to a JSON file
* processStationChunk (chunk : Pandas.DataFrame) : Pandas.DataFrame: This function iterates through all IDs in a given chunk and passes those ids into processStation, adding the resulting
array into the result dataframe, which is then returned.
* processCountyChunk (chunk : Pandas.DataFrame) : Pandas.DataFrame: Groups the chunk by state and county, then applys averageCounty and returns the result. It takes in a dataframe of individual processed 
stations and outputs a dataframe that is organized and averaged by county and parameter
* processStation (id : String, name : String, latitude : float, longitude : float) : [String, String, String, String, float, float, array(int), array(float)]: Takes in station information and
aggregates it (by max, min, or average) by year instead of the default daily information. This information is then returned in a mixed-type array that serves as a dataframe row. 
* averageCounty (countyGroup : Pandas.DataFrame) : JSON object: Averages county information from individual stations of the same county into one object. This object includes the year's that
the county has data for, along with the corresponding averaged values
* filterAndReduce(group : Pandas.DataFrame) : float: Filters out years with less than 12 months for more accurate data, then calls reduceByParam
* reduceByParam(group : Pandas.DataFrame) : float: Determines which reducer to use (detailled below) based on the parameter
* frameMax(group : Pandas.DataFrame) : float: Returns the max of all entries in a given dataframe (instead of along only one [row or col] axis)
* frameMin(group : Pandas.DataFrame) : float: Returns the min of all entries in a given dataframe
* frameMean(group : Pandas.DataFrame) : float: Returns the average of all entries in a given dataframe
* setParam(param : String) : void: Allows for the setting of param as a global variable, which was helpful in parallel experimentations (such as mapping functions in multiprocessing where
partial functions were more difficult to implement)

# Census_FIPS_to_String Documentation
A helper class that reformatted the existing county latitude and longitude information to include the state's name instead of its Census ID.

# NOAAToJSON_Parallel Documentation
An experimental and currently non-optimal parallel approach to creating JSON data for the map. Props and functions are mainly similar to the serial approach, but new or different functions will be listed below.

### Functions
* processAllStations(param : String) : void: This function now prepares the data for parallelization by adding all of the rows with a US ID to a work queue. Then, an array of processes is formed to break up the work. These processes are called on processStationQueue (detailled below). Upon getting the result (a queue of individually processed stations), the queue is casted into a dataframe. This dataframe is then broken up into chunks, which are mapped along a pool of workers into the function processCountyChunk. The result is then concatenated and written into a JSON file.
* processStationQueue (TASK_NUMBER : int, workQueue : multiprocessing.queue, stationQueue : multiprocessing.Queue, mutex : multiprocessing.Lock()) : void: The processes created in processAllStations are spun in this function until the workqueue is empty, each id being processed by calling processStation. The row is then added to the stationQueue. The task number is included for monitoring purposes.
