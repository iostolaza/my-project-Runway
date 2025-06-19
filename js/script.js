"use strict";

// js/script.js

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
document.addEventListener('DOMContentLoaded', function () {
  
  // Google Maps logic
  if (document.getElementById('map')) {
    fetch('https://projectrunway-api-175ac734850a.herokuapp.com/api/maps-key')
      .then(res => res.json())
      .then(({ key }) => {
        window.initMap = function () {
          const seoul = { lat: 37.505, lng: 127.048 };
          const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: seoul
          });
          new google.maps.Marker({
            position: seoul,
            map: map,
            title: "myprojectRunway HQ"
          });
        };
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
        script.async = true;
        document.body.appendChild(script);
      })
      .catch(err => {
        console.error('Failed to load Google Maps API key:', err);
      });
  }
});
