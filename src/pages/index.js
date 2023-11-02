import React, { useState } from "react";
import Head from "next/head"; // Import the next/head component

import ScrollBar from "../components/ScrollBar";

export default function WebMap() {
  const [currentYear, setCurrentYear] = useState(new Date(1940, 0, 1).toLocaleDateString());
  const [currentSpeed, setCurrentSpeed] = useState(1.0); // Initial speed as a float
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <div>
      <Head>
        <title>Weather and Climate Tracking</title>
      </Head>

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

      <section className="map" id="map">
        <h2>Current Map</h2>
        <p>Here is the current map we have of the rainfall through the USA in 2010.</p>
      </section>

      <div className="tab"> 
        <button className="tablinks" onclick="openMap(event, 'Precipitation')">Precipitation</button>
        <button className="tablinks" onclick="openMap(event, 'Snowfall')">Snowfall</button>
        <button className="tablinks" onclick="openMap(event, 'Maximum Temperature')">Maximum Temperature</button>
        <button className="tablinks" onclick="openMap(event, 'Minimum Temperature')">Minimum Temperature</button>
      </div>

      <div className="tabcontent" id="Precipitation">
        <h3>Precipitation</h3>
        <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
      </div>

      <div className="tabcontent" id="Snowfall">
        <h3>Snowfall</h3>
        <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
      </div>

      <div className="tabcontent" id="Maximum Temperature">
        <h3>Maximum Temperature</h3>
        <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
      </div>

      <div className="tabcontent" id="Minimum Temperature">
        <h3>Minimum Temperature</h3>
        <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
      </div>

      <button className="tablinks" onclick="openMap(event, 'Precipitation')" id="defaultOpen">Precipitation</button>

      <script>
      document.getElementById("defaultOpen").click();
      </script>

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