"use strict";
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
