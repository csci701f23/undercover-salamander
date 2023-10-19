import { Html, Head, Main, NextScript } from 'next/document'
import WebMap from '.'
 
export default function Document() {
  return (
    <Html>

    {/* <Head/> */}
    {/* Using the above head subcomponent causes hydration errors, but not having it throws a missing subcomponent error */}
    <head>
      <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Weather and Climate Tracking | the Undercover Salamanders</title>
        <link rel="stylesheet" href="style.css"/>
            {/* <!-- Fontawesome Link for Icons --> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"/>
      </head>
      <body>
        <header>
              <nav className="navbar">
                <h2 className="logo"><a href="#">LOGO</a></h2>
                <input type="checkbox" id="menu-toggler"/>
                <label htmlFor="menu-toggler" id="hamburger-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M3 18h18v-2H3v2zm0-5h18V11H3v2zm0-7v2h18V6H3z"/>
                  </svg>
                </label>
                <ul className="all-links">
                  <li><a href="#home">Home</a></li>
                  <li><a href="#vision">Our Vision</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#contact">Contact Us</a></li>
                </ul>
              </nav>
            </header> 
        <Main>
        </Main>
        <NextScript />
        <footer>
              <div>
                <span>Copyright © 2023 All Rights Reserved</span>
                <span className="link">
                    <a href="#">Home</a>
                    <a href="#contact">Contact</a>
                </span>
              </div>
            </footer>
      </body>
    </Html>
  )
}