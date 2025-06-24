
// /js/script.js
// This script handles the navigation bar functionality for both desktop and mobile views.


   // Desktop sidenav
   function openSideNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("mobileDropdown").classList.remove("open");
  }
  function closeSideNav() {
    document.getElementById("sideNav").style.width = "0";
  }

  // Mobile dropdown
  function toggleMobileNav() {
    const dropdown = document.getElementById("mobileDropdown");
    const isOpen   = dropdown.classList.toggle("open");
    document.querySelector('.site-nav')
            .setAttribute('aria-expanded', isOpen);
  }

  // Bind handlers to hamburger (desktop) or logo (mobile)
  function setupNavHandlers() {
    const logo      = document.getElementById("logoContainer");
    const hamburger = document.getElementById("hamburger");

    // Replace nodes to clear old listeners
    const newLogo      = logo.cloneNode(true);
    logo.parentNode.replaceChild(newLogo, logo);

    let newHamburger = null;
    if (hamburger) {
      newHamburger = hamburger.cloneNode(true);
      hamburger.parentNode.replaceChild(newHamburger, hamburger);
    }

    if (window.innerWidth > 600) {
      // Desktop: show hamburger, bind it to openSideNav
      if (newHamburger) {
        newHamburger.style.display = "block";
        newHamburger.addEventListener("click", openSideNav);
      }
      newLogo.style.cursor = "default";
    } else {
      // Mobile: hide hamburger, bind logo to toggleMobileNav
      if (newHamburger) newHamburger.style.display = "none";
      newLogo.style.cursor = "pointer";
      newLogo.addEventListener("click", toggleMobileNav);
    }
  }

  window.addEventListener("DOMContentLoaded", setupNavHandlers);
  window.addEventListener("resize", setupNavHandlers);



// Dynamically update footer year
function updateFooterYear() {
  const footer = document.getElementById("siteFooter");
  if (!footer) return;
  const span = footer.querySelector("span");
  if (!span) return;

  const year = new Date().getFullYear();
  span.textContent = `© ${year} myprojectRunway – All Rights Reserved.`;
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", updateFooterYear);



// function openSideNav() {
//   if (window.innerWidth > 600) { 
//     document.getElementById("sideNav").style.width = "250px";
//     // Also close mobile dropdown if open
//     document.getElementById("mobileDropdown").classList.remove("open");
//   }
// }
// function closeSideNav() {
//   document.getElementById("sideNav").style.width = "0";
// }

// // Mobile dropdown (tap logo, only on mobile)
// function toggleMobileNav() {
//   // Only activate on mobile
//   if (window.innerWidth <= 600) {
//     const dropdown = document.getElementById("mobileDropdown");
//     const expanded = dropdown.classList.toggle("open");

//     const nav = document.querySelector('.site-nav');
//     nav.setAttribute('aria-expanded', expanded);
//     // Also close sidenav if open
//     document.getElementById("sideNav").style.width = "0";
//   }
// }

// // Event listeners setup
// function setupNavHandlers() {
//   const nav = document.querySelector('.site-nav');
//   if (!nav) return; 
//   // clear any old handlers
//   nav.onclick = null;
//   nav.onkeypress = null;

//   if (window.innerWidth <= 600) {
//     // mobile: tapping anywhere on header toggles dropdown
//     nav.onclick = toggleMobileNav;
//     nav.onkeypress = e => {
//       if (e.key === 'Enter' || e.key === ' ') toggleMobileNav();
//     };
//   } else {
//     // desktop: clicking header opens sideNav
//     nav.onclick = openSideNav;
//   }

//   // Hamburger icon: hide on mobile, show on desktop
//   const hamburger = document.querySelector('.hamburger-icon');
//   if (hamburger) {
//     hamburger.style.display = window.innerWidth <= 600 ? 'none' : 'block';
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   setupNavHandlers();
//   document.querySelectorAll('.mobile-dropdown-nav a').forEach(link => {
//     link.onclick = () => {
//       document.getElementById("mobileDropdown").classList.remove("open");
//     };
//   });
// });

// window.addEventListener('resize', setupNavHandlers);

// // Optional: nav scroll effect
// window.addEventListener('scroll', () => {
//   document.querySelector('.site-nav')
//     .classList.toggle('scrolled', window.pageYOffset > 0);
// });