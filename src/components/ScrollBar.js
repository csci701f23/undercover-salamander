import React, { useEffect } from "react";

export default function ScrollBar({
  currentYear,
  setCurrentYear,
  currentSpeed,
  setCurrentSpeed,
  isPlaying,
  setIsPlaying
}) {
  useEffect(() => {
    let interval;
  
    if (isPlaying) {
      // If playing, set up an interval to increment the year
      interval = setInterval(() => {
        setCurrentYear((prevYear) => {
          const newYear = new Date(prevYear);
          newYear.setFullYear(newYear.getFullYear() + 1);
  
          // Check if the new year exceeds the maximum (2022)
          if (newYear.getFullYear() > 2022) {
            // If exceeded, set it back to the minimum (1940)
            setCurrentYear(new Date(1940, 0, 1));
            setIsPlaying(false); // Pause the animation when it reaches 2022
          } else {
            return newYear;
          }
        });
      }, 1000 / currentSpeed);
    }
  
    return () => {
      // Clear the interval when the component unmounts or when isPlaying becomes false
      clearInterval(interval);
    };
  }, [isPlaying, currentSpeed, setCurrentYear]);

  const onYearChange = (newYear) => {
    // Update the current year when the user interacts with the slider
    setCurrentYear(new Date(newYear, 0, 1));
  };

  const onSpeedChange = (newSpeed) => {
    // Update the current speed when the user interacts with the speed control
    setCurrentSpeed(parseFloat(newSpeed));
  };

  const playPause = () => {
    // Toggle the play/pause state
    setIsPlaying(!isPlaying);
  };

  const decrementYear = () => {
    // Decrease the year by one
    onYearChange(currentYear.getFullYear() - 1);
  };

  const incrementYear = () => {
    // Increase the year by one
    onYearChange(currentYear.getFullYear() + 1);
  };

  return (
    <div className="scrollbar-container">
      <label htmlFor="year-slider">Year:</label>
      {/* Year slider input */}
      <input
        type="range"
        min={1940}
        max={2022}
        value={currentYear instanceof Date ? currentYear.getFullYear() : currentYear}
        onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        id="year-slider"
      />
      {/* Display the current year */}
      <output>{`Year: ${currentYear instanceof Date ? currentYear.getFullYear() : currentYear}`}</output>


      {/* Control buttons */}
      <div className="buttons">
        <span onClick={decrementYear}>⤆</span>
        <span onClick={() => setCurrentSpeed(currentSpeed - 0.5)}>⏪</span>
        <span onClick={playPause}>{isPlaying ? "⏸" : "⏵"}</span>
        <span onClick={() => setCurrentSpeed(currentSpeed + 0.5)}>⏩</span>
        <span onClick={incrementYear}>⤇</span>
      </div>
    </div>
  );
}