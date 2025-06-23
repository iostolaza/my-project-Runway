// Desktop sidenav (only on desktop)
function openSideNav() {
  if (window.innerWidth > 600) { // only on desktop
    document.getElementById("sideNav").style.width = "250px";
    // Also close mobile dropdown if open
    document.getElementById("mobileDropdown").classList.remove("open");
  }
}
function closeSideNav() {
  document.getElementById("sideNav").style.width = "0";
}

// Mobile dropdown (tap logo, only on mobile)
function toggleMobileNav() {
  // Only activate on mobile
  if (window.innerWidth <= 600) {
    const dropdown = document.getElementById("mobileDropdown");
    dropdown.classList.toggle("open");
    // Also close sidenav if open
    document.getElementById("sideNav").style.width = "0";
  }
}

// Event listeners setup
function setupNavHandlers() {
  const logo = document.getElementById('logoContainer');
  // Remove any old handlers (avoid stacking)
  logo.onclick = null;
  logo.onkeypress = null;
  if (window.innerWidth <= 600) {
    logo.onclick = toggleMobileNav;
    logo.onkeypress = function(e) {
      if (e.key === 'Enter' || e.key === ' ') toggleMobileNav();
    };
  }

  // Hamburger: Show only on desktop, hide on mobile
  const hamburger = document.querySelector('.hamburger-icon');
  if (window.innerWidth <= 600) {
    hamburger.style.display = 'none';
  } else {
    hamburger.style.display = 'block';
  }
}

// Re-run handler setup on resize for responsiveness
window.addEventListener('resize', setupNavHandlers);

document.addEventListener('DOMContentLoaded', function() {
  setupNavHandlers();

  // Close mobile dropdown when a link is clicked (mobile only)
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
