
// js/maps.js

// /js/maps.js
window.initMap = function () {

  const lat = 37.506296857302786;
  const lng = 127.05364451313847;
  const companyLocation = { lat, lng };
  const gmapsUrl = `https://www.google.com/maps/place/427+Teheran-ro,+Gangnam-gu,+Seoul,+South+Korea/@${lat},${lng},17z`;
  const dirToUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const dirFromUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}`;


  // Map appears inside the element with id 'map-canvas'
  const map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 17,
    center: companyLocation,
  });

  // Marker: Use AdvancedMarkerElement if available, fallback otherwise
  let marker;
  if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
    const { AdvancedMarkerElement } = google.maps.marker;
    marker = new AdvancedMarkerElement({
      map,
      position: companyLocation,
      title: "myprojectRunway HQ",
    });
  } else {
    marker = new google.maps.Marker({
      position: companyLocation,
      map,
      title: "myprojectRunway HQ",
    });
  }

  const infoContent = `
  <strong>myprojectRunway HQ</strong><br>
  427 Teheran-ro, Gangnam District<br>
  Seoul, South Korea<br>
  <a href="${dirToUrl}" target="_blank" style="color:#1976d2;">Directions <b>to</b> here</a> |
  <a href="${dirFromUrl}" target="_blank" style="color:#1976d2;">Directions <b>from</b> here</a>
  <br>
  <button id="shareBtn" style="margin:8px auto 2px 0;display:block;padding:3px 11px 2px 11px;border-radius:6px;border:1px solid #1976d2;background:#1976d2;color:white;cursor:pointer;">Share</button>
  <span style="font-size:0.92em;color:#666;">
    (Open in Google Maps for “Send to phone” and sharing options)
  </span>
`;

  const infowindow = new google.maps.InfoWindow({ content: infoContent });

  // Open info window by default
  infowindow.open(map, marker);

  // Also open info window when marker is clicked
  if (marker.addListener) {
    marker.addListener("click", () => infowindow.open(map, marker));
  } 
  // else if (marker.addEventListener) {
  //   marker.addEventListener("click", () => infowindow.open(map, marker));
  // }

  google.maps.event.addListener(infowindow, 'domready', function() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.onclick = function() {
        if (navigator.share) {
          navigator.share({
            title: 'myprojectRunway HQ',
            text: 'myprojectRunway HQ – Seoul',
            url: gmapsUrl,
          });
        } else {
          navigator.clipboard.writeText(gmapsUrl);
          alert('Link copied! Paste to share.');
        }
      };
    }
  });
};
