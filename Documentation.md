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