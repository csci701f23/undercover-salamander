import React, { useState, useEffect } from "react";

export default function ScrollBar() {
  const [currentYear, setCurrentYear] = useState(new Date(1940, 0, 1));
  const [currentSpeed, setCurrentSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(true);

  const onYearChange = (newYear) => {
    setCurrentYear(new Date(newYear, 0, 1));
  };

  const onSpeedChange = (newSpeed) => {
    setCurrentSpeed(parseFloat(newSpeed));
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        const currentYearObject = new Date(currentYear);
        currentYearObject.setFullYear(currentYearObject.getFullYear() + 1);
        setCurrentYear(currentYearObject);
      }, 1000 / currentSpeed);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, currentYear, currentSpeed]);

  return (
    <div className="scrollbar-container">
      <div>
        <label htmlFor="year-slider">Year:</label>
        <input
          type="range"
          min={1940}
          max={2022}
          value={currentYear.getFullYear()}
          onChange={(e) => onYearChange(e.target.value)}
          id="year-slider"
        />
        <output>{`Year: ${currentYear.getFullYear()}`}</output>
        <output>{`Month: ${currentYear.toLocaleString("default", { month: "long" })}`}</output>
      </div>
      <div className="buttons">
        <span onClick={() => setCurrentYear(currentYear - 1)}>⤆</span>
        <span onClick={() => setCurrentSpeed(currentSpeed - 0.25)}>⏪</span>
        <span onClick={playPause}>{isPlaying ? "⏸" : "⏵"}</span>
        <span onClick={() => setCurrentSpeed(currentSpeed + 0.25)}>⏩</span>
        <span onClick={() => setCurrentYear(currentYear + 1)}>⤇</span>
      </div>
    </div>
  );
}