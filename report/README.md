## Middlebury College, CSCI 701 (Senior Seminar, Fall 2023)

# Introduction
In an era characterized by unprecedented concerns involving climate change, it is imperative to establish a platform where individuals can connect the weather events they experience in their everyday lives to the greater trends resulting from global warming. Radhika Iyengar identified climate education as a “key climate risk mitigation strategy” [^cho], and creating such a platform would empower people to establish a link between their day-to-day weather experiences and the consequences of carbon emissions and global warming. We hope this connection will serve as a starting point, inspiring individuals to make changes in their own lives or advocate for meaningful climate legislation.

While it is known that carbon emissions cause global climates to change, and those climate changes in turn affect the patterns of weather that occur, many individuals with no climate science background often directly equate climate change to weather [^lang]. For example, if you were to ask someone to describe climate change, there is a high probability that they would mention something about the weather, or specific weather patterns such as temperature or snowfall. We are able to leverage this information and data of climate-to-weather correlations to engage and educate a large audience. Knowing that people intuitively relate climate change to weather, we can use the history of weather patterns over time to educate people on how weather is shown to be affected by carbon emissions. The ongoing trends in carbon emissions have influenced daily weather patterns that we are able to track over time. For example, according to the 2022 climate report released by the National Oceanic and Atmospheric Administration (NOAA), “North America’s temperature has increased at an average rate of 0.49 degrees Fahrenheit since 1981” [^ncei].

To understand how weather patterns have changed over time, we are using data from NOAA’s weather station database, which contains extensive daily weather tracking information from 1,219 weather stations across the United States. Although the database tracks many weather patterns, we specifically focus on minimum and maximum temperatures, precipitation, and snowfall from 1940 - 2022. These variables are some of the key average weather patterns and climate occurrences people experience in their day-to-day lives, and thus what can most easily relate to the public.

Visualizations, such as maps or iteractive displays, can provide a natural way of interpreting weather data. A 2008 study showed that within a group of researchers working with climate data, about 58% of the visualizations were used in part to comprehensibly present scientific results to decision-makers, stakeholders, and the media [^nocke]. Visuals can help transmit information in an easy-to-understand and fast manner, two critical components when trying to impart knowledge to the general populace. From the Google Trends study, we know that individuals seek out information on climate change after experiencing an extreme weather event [^lang]. Our visualizations aim to illustrate the influence of global warming on weather patterns in a manner that is easy to comprehend, highlighting subtle changes that may go unnoticed amongst the increase of extreme weather events such as hurricanes and wildfires.

Another important aspect of creating visual representations that are easy for the public to understand is the interactivity of the piece. There are certain benefits to static displays or images, such as simplicity and immediate access to all of the information, but this plethora of information often muddles the details of the data. One small study found that "clarity was considered to be a strength of the interactive visualization and commonly noted as a weakness of the static piece" while comparing the effectiveness of different visualizations as tools to connect the general public to climate change research [^newell]. In this study, interactive visuals gave a better sense of movement and change over time. One of the main objectives of our project is to give people a sense of the scale of the effects of climate change and to be able to see these changes unfold over time without any difficulty navigating the data.

Our project addresses some of the gaps that exist in current climate research. Primarily, we tackle the bridge between visualization and climate data. As noted above, visualization provides accessibility to data that the raw weather data does not. Instead of ignoring the evidence for climate change, users will be able to see the effects for themselves. This is succinctly summed up in the work of Nocke et al., who state “a major task for future developments is to further bridge the gap between climate and visualization expertise” [^nocke]. Once people are educated on climate change, they are more likely to assist in the effort to reverse it. While secondary to the visualization project, the website will provide resources for individual and collective activism. This could include local and global groups that fight climate change, links to relevant politicians to contact, or organizations to donate to. Including possibilities for action is thus important, giving newly informed people direct ways to help.

In visualizing climate data, we are providing an accessible resource for climate education. We hope that more people will be more likely to act as a result of this project–-knowledge alone is not enough to reverse the effects of climate change, and we need as many people as possible fighting against it.

# Methodology
We implemented our frontend using React and Next.js. For our React components, we created a components directory that held the Map, color scale (Scale.js), ScrollBar, TabBar, and a MapViewer. The MapViewer component controlled the relevant bits of state, such as the parameter (augmented by TabBar and sent to Map and Scale) and the current year being displayed (augmented by ScrollBar and used by the Map). A general overview of our component hierarchy can be seen in `report/Component_Hierarchy.pdf`.

Our Map component uses the parameter determined by TabBar to assign values to a color gradient, the data being mapped (rainfall, snowfall, or minimum or maximum temperature). From there, it maps counties from an open source geoJSON file to create a background map, which are then colored in by querying our numerical data at that county, state, and year. If the data does not exist, the county is colored in light gray. Our map pseudocode can be seen here:

1. Extract country and state information
2. Find corresponding data using countyID
3. Extract average region value for given year
4. Set region color based on value corresponding with scale

Our ScrollBar component controls the year being displayed. We gave it pieces of state to control the speed of its scroll and the whether or not it is scrolling at that moment. The scrolling effect is accomplished using setInterval, which uses the currentSpeed state to determine how long to wait before proceeding to the next year. These pieces of state are changed through our UI, which are pieces of text that can be clicked on by the user.

The TabBar works by defining buttons that listen for click events by the user. On click, the TabBar component sets the currentTab to the corresponding clicked button. This state is a string that is used as a parameter in the other front end components (such as Scale and Map). The Scale component, which is rendered by the Map component, uses the current tab to set the current gradient (color pallete being used by the map) and anchor points for the key.

For our backend, we processed data from NOAA's 70,000 United States weather stations [^noaa]. This data had daily information, and we pulled from 1940 to 2022 in NOAAToJSON_Serial.py. As such, in our data processing we filter out all of the non-US stations from NOAA's dataset. Pre-processing also includes a definition of our columns, as NOAA uses a fixed width file format that needs to be adapted to be used in a Pandas.DataFrame context. Once these stations are in a dataframe, we process them individually by reducing the daily values into yearly values through a year groupby. For rainfall and snowfall, this is a framewise average of all o the values in one year. For the minimum and maximum temperature, we reduce into the yearly minimum or maximum respectively. This reduction is filtered, as years without data for all 12 months are excluded to preserve data accuracy. We also use this function to reverse geocode their county and state via latitude and longitude data. Once this process is done, we send an updated dataframe (one with all individual stations processed with an array of relevant years and their corresponding values) to the reduceCounty function. This function creates county-based data out of the individual stations, reducing all stations in a county in a similar manner to the daily-to-yearly reduction. This county data is then returned to a json object. Finally, each county is added to a final dataframe, which is output as a json object (which is used as our numerical mapping data). A diagram of the code can be seen in `report/Backend_Diagram.pdf`.

# Discussion
Some future work for our project could include the parallelization of the data processing, as an approach was determined using a work queue system, but was not given enough time for debugging or full implementation. This could be improved through syncronization debugging and downloading the data before processing to prevent the limiting factor of requesting NOAA or Nominatim (geocoding API). Alternatively, adding functionality that actively fetches the data from NOAA on update (particularly when the current year ends) would be a way to add dynamic changes to the site.

# Methodology

## Scroll Bar Component
The scroll bar is a React component that is designed to allow the user to control the time-based scroll functionality of our program. It includes a scroll bar, a pause button and forward and backward buttons that the user can operate to change the year they want to be displayed. The purpose of the scroll bar is to allow the user to have control over what year they want to see and when. They can decide if they want the simulation to play continuously and at what speed or if they want to focus on viewing only one map at a time for as long as they want by pausing the simulation. The scroll bar is build using react js and more specifics of this methodology are described below.

### Props
Props are used to pass data from a parent component to a child component. They are immutable, meaning the child can only read the information from the parent but cannot modify it. Below are props that are used in the scroll bar component

* currentYear (Date): contains the value of the year being displayed on the scroll bar
* setCurrentYear (function): A function to update the current year when the user interacts with the slider or buttons
* currentSpeed (number): value of the current speed the playback is running at
* setCurrentSpeed (function): a function to update the playback speed when user interacts with the speed buttons
* isPlaying (boolean): a flag to indicate if the playback is playing or paused
* setIsPlaying (function): a function to toggle the play/pause state

### useEffect hook
A useEffect hook allows us to perform side tasks within functional components, such as fetching data. In the scroll bar code, the useEffect hook manages the interval for the automatic year incrementation when playback is active. The currentSpeed sets the interval and it is cleared when the playback is paused or when the slider reaches the end.

### event handlers
Event handlers are functions that are triggered in response to specific events such as clicking a button. Below are the event handlers that are used to change the state of different variables within the scroll bar component. 

* onYearChange (function): updates the current year when there is user interaction
* onSpeedChange (function): updates the playback speed when there is user interaction
* playPause (function): updates the play/pause state when the play/pause button is clicked
* decrementYear (function): Decreases the displayed year by one when the user clicks the corresponding button
* incrementYear (function): increases the displayed year by one when the user clicks the corresponding button

### UI components
User interface components are aspects of the code that specify styling and functionality for the user. Below are different UI components implemented in the scroll bar.

* Year slider: allows the user to drag the slider through a specified year range
* Current Year Display: displays the current year obtained from the slider or buttons
* Current Month Display: displays the current month based on the slider and buttons
* Control Buttons: includes buttons for incrementing and decrementing the year, pausing the playback, and adjusting the playback speed


# References
[^cho]: Cho, R. (2023). Climate Education in the U.S.: Where It Stands, and Why It Matters. State of the Planet | Columbia Climate School. https://news.climate.columbia.edu/2023/02/09/climate-education-in-the-u-s-where-it-stands-and-why-it-matters/

[^lang]: Lang, C. (2014). Do weather fluctuations cause people to seek information about climate change?. Climatic change, 125(3-4), 291-303. https://link.springer.com/article/10.1007/s10584-014-1180-6

[^ncei]: NCEI.Monitoring.Info@noaa.gov. (2023, January). Annual 2022 global climate report. Annual 2022 Global Climate Report | National Centers for Environmental Information (NCEI). https://www.ncei.noaa.gov/access/monitoring/monthly-report/global/202213

[^newell]: Newell, R., Dale, A., & Winters, C. (2016). A picture is worth a thousand data points: Exploring visualizations as tools for connecting the public to climate change research. Cogent Social Sciences, 2(1), [DOI: 10.1080/23311886.2016.1201885](https://www.tandfonline.com/doi/full/10.1080/23311886.2016.1201885)

[^nocke]: Nocke, T., Sterzel, T., Böttinger, M., & Wrobel, M. (2008). Visualization of Climate and Climate Change Data: An Overview. in Ehlers et al. (Eds.) Digital Earth Summit on Geoinformatics 2008: Tools for Global Change Research (ISDE'08), Wichmann, Heidelberg, 226-232. https://www.researchgate.net/publication/241401725_Visualization_of_Climate_and_Climate_Change_Data_An_Overview

[^noaa]: Menne, M.J., I. Durre, B. Korzeniewski, S. McNeill, K. Thomas, X. Yin, S. Anthony, R. Ray, R.S. Vose, B.E.Gleason, and T.G. Houston, 2012: Global Historical Climatology Network - Daily (GHCN-Daily), Version 3.30. NOAA National Climatic Data Center. http://doi.org/10.7289/V5D21VHZ [access date].
