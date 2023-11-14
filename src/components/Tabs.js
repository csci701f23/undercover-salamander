import React, { useState } from "react";

export default function openMap(evt, currMap) {
    //const [currentTab, setCurrentTab] = useState(currMap);
  
    // Get all elements with class="tabcontent" and hide them
    const tabcontent = ReactDOM.createRoot(document.getElementsByClassName("tabcontent"));
    tabcontent.forEach((tab) => {
      tab.style.display = "none";
    });
  
    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = ReactDOM.createRoot(document.getElementsByClassName("tablinks"));
    tablinks.forEach((tablink) => {
      tablink.className = tablink.className.replace(" active", "");;
    });
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    tab = document.getElementById(currMap);
    tab.style.display = "block";
    evt.currentTarget.className += " active";
  }