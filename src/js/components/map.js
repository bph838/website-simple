const { SITE_TITLE } = require("../constants");

export function initMap(data) {
  let latitude = data.latitude || 0;
  let longitude = data.longitude || 0;
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("No map div to render to");
    return;
  }

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 16,
  });

  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: SITE_TITLE,
  });
}
