export default function WebMap() {
    return ( 
        // <!DOCTYPE html>
        // <!-- Coding Template by CodingNepal - www.codingnepalweb.com -->
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Weather and Climate Tracking | the Undercover Salamanders</title>
            <link rel="stylesheet" href="style.css"/>
            {/* <!-- Fontawesome Link for Icons --> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"/>
          </head>
          <body>
            <header>
              <nav class="navbar">
                <h2 class="logo"><a href="#">LOGO</a></h2>
                <input type="checkbox" id="menu-toggler"/>
                <label for="menu-toggler" id="hamburger-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 18h18v-2H3v2zm0-5h18V11H3v2zm0-7v2h18V6H3z"/>
                  </svg>
                </label>
                <ul class="all-links">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#vision">Our Vision</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                </ul>
              </nav>
            </header>
        
            <section class="homepage" id="home">
              <div class="content">
                <div class="text">
                  <h1>Weather and Climate Tracking</h1>
                  <p>
                    Our basic website to track and simulate the effects of climate change<br/>on weather patterns.</p>
                  </div>
              </div>
            </section>
        
            <section class="vision" id="vision">
              <h2>Our Vision</h2>
              <p>Take a look at what we plan to create and add to our website.</p>
              <ul class="cards">
                <li class="card">
                  <img src="images/climate-1.jpeg" alt="img"/>
                  <h3>Climate Tracking</h3>
                  <p>***about this here</p>
                </li>
                <li class="card">
                  <img src="images/climate-2.gif" alt="img"/>
                  <h3>Rainfall Tracking</h3>
                  <p>***about this here</p>
                </li>
                <li class="card">
                  <img src="images/climate-3.jpeg" alt="img"/>
                  <h3>Snowfall Tracking?</h3>
                  <p>***about this here</p>
                </li>
                <li class="card">
                  <img src="images/climate-4.png" alt="img"/>
                  <h3>Weather Simulation</h3>
                  <p>***about this here</p>
                </li>
                <li class="card">
                  <img src="images/climate-5.jpg" alt="img"/>
                  <h3>Maps through Time</h3>
                  <p>***about this here</p>
                </li>
                <li class="card">
                  <img src="images/climate-6.png" alt="img"/>
                  <h3>Rewind Time</h3>
                  <p>***about this here</p>
                </li>
              </ul>
            </section>
        
            <section class="about" id="about">
              <h2>About Us</h2>
              <p>Discover why we are creating this website.</p>
              <div class="row company-info">
                <h3>Our Story</h3>
                <p>We are all motivated computer science majors who have an interest in the environment and how climate change is affecting our planet. We decided to make this website in order to put together these interests and see how we can do our part to help.</p>
              </div>
              <div class="row mission"> 
                <h3>Our Mission</h3>
                <p>Our mission is to create a website which will simulate the effect of climate change on weather patterns throughout a period of time, hopefully giving us a better perspective on how our planet's ecosystems have been affected.</p>
              </div>
              <div class="row team">
                <h3>Our Team</h3>
                <ul>
                  <li>Lauren Clarke - Developer</li>
                  <li>Cece Ziegler - Developer</li>
                  <li>Jeff Blake - Developer</li>
                </ul>
              </div>
            </section>
        
            <section class="contact" id="contact">
              <h2>Contact Us</h2>
              <p>Reach out to us for any inquiries or feedback.</p>
              <div class="row">
                <div class="col information">
                  <div class="contact-details">
                    <p><i class="fas fa-map-marker-alt"></i> Middlebury College, Middlebury, VT 05753</p>
                    <p><i class="fas fa-envelope"></i> N/A</p>
                    <p><i class="fas fa-phone"></i> N/A</p>
                    <p><i class="fas fa-clock"></i> Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p><i class="fas fa-clock"></i> Saturday - Sunday: N/A</p>
                    <p><i class="fas fa-globe"></i> https://github.com/csci701f23/undercover-salamander</p>
                  </div>          
                </div>
                <div class="col form">
                  <form>
                    <input type="text" placeholder="Name*" required/>
                    <input type="email" placeholder="Email*" required/>
                    <textarea placeholder="Message*" required></textarea>
                    <button id="submit" type="submit">Send Message</button>
                  </form>
                </div>
              </div>
            </section>
        
            <footer>
              <div>
                <span>Copyright © 2023 All Rights Reserved</span>
                <span class="link">
                    <a href="#">Home</a>
                    <a href="#contact">Contact</a>
                </span>
              </div>
            </footer>
        
          </body>
        </html>
    );
}