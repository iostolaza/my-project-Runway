"use strict";

// js/script.js

// Determine API root
const hostname = window.location.hostname;
const API_ROOT = (
  hostname === "myprojectrunway.com" ||
  hostname === "www.myprojectrunway.com"
)
  ? "https://projectrunway-api-175ac734850a.herokuapp.com"
  : "http://localhost:5000";

// NAVIGATION
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
// SCROLL EFFECT
window.addEventListener('scroll', function() {
  document.querySelector('nav').classList.toggle('scrolled', window.pageYOffset > 0);
});

// Google Maps API and Contact Form
document.addEventListener("DOMContentLoaded", function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  fetch(`${API_ROOT}/api/maps-key`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(({ key }) => {
      window.initMap = function () {
        const seoul = { lat: 37.505, lng: 127.048 };
        const map = new google.maps.Map(mapEl, {
          zoom: 15,
          center: seoul,
        });
        new google.maps.Marker({
          position: seoul,
          map,
          title: "myprojectRunway HQ",
        });
      };

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
    })
    .catch((err) => {
      console.error("Failed to load Google Maps API key:", err);
    });
});