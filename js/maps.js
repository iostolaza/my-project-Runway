
// js/maps.js

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('map')) {
      const myLatLng = { lat: 37.5172, lng: 127.0473 };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
      });
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: "myprojectRunway HQ",
      });
    }
  });
  