// Desktop sidenav (only on desktop)
function openSideNav() {
  document.getElementById("sideNav").style.width = "250px";
}
function closeSideNav() {
  document.getElementById("sideNav").style.width = "0";
}

// Mobile dropdown (no hamburger, tap company name)
function toggleMobileNav() {
  const dropdown = document.getElementById("mobileDropdown");
  dropdown.classList.toggle("open");
}

// Mobile only: Open dropdown when logo-container is clicked
document.addEventListener('DOMContentLoaded', function() {
  // Mobile: open dropdown on logo tap
  const logo = document.getElementById('logoContainer');
  if (window.matchMedia('(max-width: 600px)').matches) {
    logo.onclick = toggleMobileNav;
    logo.onkeypress = function(e) {
      if (e.key === 'Enter' || e.key === ' ') toggleMobileNav();
    };
  }
  // Close dropdown when a link is clicked (mobile)
  document.querySelectorAll('.mobile-dropdown-nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("mobileDropdown").classList.remove("open");
    });
  });
});

// Optional: nav scroll effect
window.addEventListener('scroll', function() {
  document.querySelector('.site-nav').classList.toggle('scrolled', window.pageYOffset > 0);
});
