import MapViewer from "../components/MapViewer.js";
import Map from "../components/Map.js"
import Head from "next/head.js";
import data from "../../data-map-exploration/gz_2010_us_050_00_5m.json"
// TODO: fix moving index from html to js

export default function WebMap() {
  return (
    // <!DOCTYPE html>
    // <!-- Coding Template by CodingNepal - www.codingnepalweb.com -->
    <div>
      <body>
        <section className="homepage" id="home">
          <div className="content">
            <div className="text">
              <h1>Weather and Climate Tracking</h1>
              <p>
                Our basic website to track and simulate the effects of climate change<br />on weather patterns.</p>
            </div>
          </div>
        </section>



        <section className="map" id="map">
          <h2>Current Map</h2>
          {/* TODO: Make width = screen.width without breaking the map */}
          <Map width={1366} height={500} data={data}/>
          <p>Here is the current map we have of the rainfall through the USA in 2010.</p>
          <img src="images/data-map-exploration.png" alt="img" className="climatemap" />
        </section>

        <section className="vision" id="vision">
          <h2>Our Vision</h2>
          <p>Take a look at what we plan to create and add to our website.</p>
          <ul className="cards">
            <li className="card">
              <img src="images/climate-1.jpeg" alt="img" />
              <h3>Climate Tracking</h3>
              <p>***about this here</p>
            </li>
            <li className="card">
              <img src="images/climate-2.gif" alt="img" />
              <h3>Rainfall Tracking</h3>
              <p>***about this here</p>
            </li>
            <li className="card">
              <img src="images/climate-3.jpeg" alt="img" />
              <h3>Snowfall Tracking?</h3>
              <p>***about this here</p>
            </li>
            <li className="card">
              <img src="images/climate-4.png" alt="img" />
              <h3>Weather Simulation</h3>
              <p>***about this here</p>
            </li>
            <li className="card">
              <img src="images/climate-5.jpg" alt="img" />
              <h3>Maps through Time</h3>
              <p>***about this here</p>
            </li>
            <li className="card">
              <img src="images/climate-6.png" alt="img" />
              <h3>Rewind Time</h3>
              <p>***about this here</p>
            </li>
          </ul>
        </section>

        <section className="about" id="about">
          <h2>About Us</h2>
          <p>Discover why we are creating this website.</p>
          <div className="row company-info">
            <h3>Our Story</h3>
            <p>We are all motivated computer science majors who have an interest in the environment and how climate change is affecting our planet. We decided to make this website in order to put together these interests and see how we can do our part to help.</p>
          </div>
          <div className="row mission">
            <h3>Our Mission</h3>
            <p>Our mission is to create a website which will simulate the effect of climate change on weather patterns throughout a period of time, hopefully giving us a better perspective on how our planet's ecosystems have been affected.</p>
          </div>
          <div className="row team">
            <h3>Our Team</h3>
            <ul>
              <li>Lauren Clarke - Developer</li>
              <li>Cece Ziegler - Developer</li>
              <li>Jeff Blake - Developer</li>
            </ul>
          </div>
        </section>

        <section className="contact" id="contact">
          <h2>Contact Us</h2>
          <p>Reach out to us for any inquiries or feedback.</p>
          <div className="row">
            <div className="col information">
              <div className="contact-details">
                <p><i className="fas fa-map-marker-alt"></i> Middlebury College, Middlebury, VT 05753</p>
                <p><i className="fas fa-envelope"></i> N/A</p>
                <p><i className="fas fa-phone"></i> N/A</p>
                <p><i className="fas fa-clock"></i> Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p><i className="fas fa-clock"></i> Saturday - Sunday: N/A</p>
                <p><i className="fas fa-globe"></i> https://github.com/csci701f23/undercover-salamander</p>
              </div>
            </div>
            <div className="col form">
              <form>
                <input type="text" placeholder="Name*" required />
                <input type="email" placeholder="Email*" required />
                <textarea placeholder="Message*" required></textarea>
                <button id="submit" type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}