import MapViewer from "../components/MapViewer.js";
// TODO: fix moving index from html to js
import React, { useState } from "react";
import Head from "next/head"; // Import the next/head component

//TODO: fix issues:
//  Warning: viewport meta tags should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-viewport-meta
//  Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title

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
              Visualizing weather pattern changes from 1940 to 2022.
            </p>
          </div>
        </div>
      </section>

      <section className="map" id="map">
        <MapViewer/>
      </section>


      <section className="whymatters" id="whymatters">
        <h2>Why This Matters</h2>
        <p>In an era characterized by unprecedented concerns involving climate change, it is imperative to establish a platform where individuals can connect the weather events they experience in their everyday lives to the greater trends resulting from global warming. We hope that our website will provide you with just that. Through our visualizations, we hope you can establish a connection in your own life that will serve as a starting point, inspiring you to make changes or advocate for meaningful climate legislation.  </p>
        <div className="row company-info">
        </div>
      </section>

      <section className="about" id="about">
        <h2>About Us</h2>
        <p>This is who we are.</p>
        <div className="row">
        </div>
      </section>
    </div>
  );
}