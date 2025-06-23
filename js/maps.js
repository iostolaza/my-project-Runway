
// js/maps.js

window.initMap = function () {
  // Most accurate lat/lng for 427 Teheran-ro, Gangnam District, Seoul
  const myAddress = { lat: 37.504934, lng: 127.048514 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: myAddress,
  });

  const marker = new google.maps.Marker({
    position: myAddress,
    map,
    title: "myprojectRunway HQ",
  });

  // Optional: Info window for address clarity
  const infowindow = new google.maps.InfoWindow({
    content: `<strong>myprojectRunway HQ</strong><br>427 Teheran-ro, Gangnam District<br>Seoul, South Korea`
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });

  // Optionally, auto-open info window on load:
  infowindow.open(map, marker);
};
