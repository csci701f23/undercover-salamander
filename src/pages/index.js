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

      <section className="visuals" id="visuals">
        <MapViewer/>
      </section>


      <section className="whythismatters" id="whythismatters">
        <h2>Why This Matters</h2>
        <p>Discover why we are creating this website.</p>
        <div className="row company-info">
        </div>
      </section>

      <section className="aboutus" id="aboutus">
        <h2>About Us</h2>
        <p>This is who we are.</p>
        <div className="row">
        </div>
      </section>
    </div>
  );
}