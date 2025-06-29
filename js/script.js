
// /js/script.js

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
