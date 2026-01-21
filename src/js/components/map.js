const { SITE_TITLE } = require("../constants");

export function initMap(data) {
  let latitude = data.latitude || 0;
  let longitude = data.longitude || 0;
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("No map div to render to");
    return;
  }

  /*
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 16,
  });


  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: SITE_TITLE,
  });

  // Create an advanced marker
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: latitude, lng: longitude },
      map: map,
      content: `
        <div style="
          background: white;
          border: 1px solid #333;
          padding: 5px 10px;
          border-radius: 8px;
          font-weight: bold;
        ">
          ${SITE_TITLE}
        </div>
      `
    });
*/
}

export function initMapFrame(data) {
  let latitude = data.latitude || 0;
  let longitude = data.longitude || 0;
  const mapDiv = document.getElementById("map");
  if (!mapDiv) {
    console.error("No map div to render to");
    return;
  }
  mapDiv.innerHTML = `<iframe
    width="100%"
    height="100%"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed">
  </iframe>`;
}
