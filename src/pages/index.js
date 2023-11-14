import React, { useState, useEffect } from "react";
import Head from "next/head";
import MapViewer from "../components/MapViewer.js";
import Map from "../components/Map"
// TODO: fix moving index from html to js
import React, { useState } from "react";
import Head from "next/head"; // Import the next/head component

import ScrollBar from "../components/ScrollBar";

export default function WebMap() {
  const initialYear = new Date(1940, 0, 1);

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentSpeed, setCurrentSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  console.log('Current Year in WebMap:', currentYear);
  
  return (
    <div>
      <Head>
        <title>Weather and Climate Tracking</title>
      </Head>

      <section className="map" id="map">
        <h2>Current Map</h2>
        <MapViewer/>
        <p>Here is the current map we have of the rainfall through the USA in 2010.</p>
        <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
      </section>

      <section className="homepage" id="home">
        <div className="content">
          <div className="text">
            <h1>Weather and Climate Tracking</h1>
            <p>
              Our basic website to track and simulate the effects of climate change on weather patterns.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="map" id="map">
        <h2>Current Map</h2>
        <p>Here is the current map we have of the rainfall through the USA in 2010.</p>
        <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
      </section>
      </section> */}

      <div>
        <ScrollBar
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          currentSpeed={currentSpeed}
          setCurrentSpeed={setCurrentSpeed}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>
      <section className="vision" id="vision">
        <h2>Our Vision</h2>
        <p>Take a look at what we plan to create and add to our website.</p>
        <ul className="cards">
          {/* ... (rest of your code) */}
        </ul>
      </section>

      <section className="about" id="about">
        <h2>About Us</h2>
        <p>Discover why we are creating this website.</p>
        <div className="row company-info">
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Contact Us</h2>
        <p>Reach out to us for any inquiries or feedback.</p>
        <div className="row">
        </div>
      </section>
    </div>
  );
}