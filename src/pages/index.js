import MapViewer from "../components/MapViewer.js";
import Map from "../components/Map"
// TODO: fix moving index from html to js
import React, { useState } from "react";
import Head from "next/head"; // Import the next/head component

import ScrollBar from "../components/ScrollBar";

export default function WebMap() {
  
  
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
        <MapViewer/>
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