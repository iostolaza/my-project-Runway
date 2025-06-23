
// js/script.js

// Modern NAVIGATION for single nav structure
function toggleNav() {
  const dropdown = document.getElementById("dropdownNav");
  dropdown.classList.toggle("open");
}

// Optional: Close dropdown if link is clicked (for SPA-like feel)
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.dropdown-nav a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("dropdownNav").classList.remove("open");
    });
  });
});

// SCROLL EFFECT for desktop nav (add class on scroll)
window.addEventListener('scroll', function() {
  document.querySelector('.site-nav').classList.toggle('scrolled', window.pageYOffset > 0);
});