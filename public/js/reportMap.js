// public/js/reportMap.js
document.addEventListener("DOMContentLoaded", function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return; // not a map page

  // sensible default center (India). If geolocation is allowed, we'll move.
  const defaultLatLng = [20.5937, 78.9629];
  const defaultZoom = 5;

  // create map
  const map = L.map("map").setView(defaultLatLng, defaultZoom);

  // tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  let marker = null;

  function updateInputs(lat, lng) {
    const latInput = document.querySelector('input[name="lat"]');
    const lngInput = document.querySelector('input[name="lng"]');
    const coordsDisplay = document.getElementById("coordsDisplay");
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;
    if (coordsDisplay) coordsDisplay.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }

  function setMarker(lat, lng) {
    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      marker.on("dragend", function () {
        const p = marker.getLatLng();
        updateInputs(p.lat, p.lng);
      });
    }
    map.setView([lat, lng], 16);
    updateInputs(lat, lng);
  }

  // click on map -> place marker
  map.on("click", function (e) {
    setMarker(e.latlng.lat, e.latlng.lng);
  });

  // "Use my location" button
  const locateBtn = document.getElementById("locateBtn");
  if (locateBtn) {
    locateBtn.addEventListener("click", function (ev) {
      ev.preventDefault();
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
      locateBtn.disabled = true;
      locateBtn.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          setMarker(pos.coords.latitude, pos.coords.longitude);
          locateBtn.disabled = false;
          locateBtn.textContent = "Use my location";
        },
        function (err) {
          alert("Unable to retrieve your location: " + err.message);
          locateBtn.disabled = false;
          locateBtn.textContent = "Use my location";
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  // validate on submit: ensure lat/lng present
  const form = document.getElementById("reportForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      const lat = document.querySelector('input[name="lat"]').value;
      const lng = document.querySelector('input[name="lng"]').value;
      if (!lat || !lng) {
        ev.preventDefault();
        alert("Please select a location on the map (click or use 'Use my location').");
      }
    });
  }

  // if inputs already have values (edit case), show marker
  const latVal = document.querySelector('input[name="lat"]').value;
  const lngVal = document.querySelector('input[name="lng"]').value;
  if (latVal && lngVal) {
    setMarker(parseFloat(latVal), parseFloat(lngVal));
  } else {
    // try to center map on user's location for convenience (non-blocking)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (p) {
          map.setView([p.coords.latitude, p.coords.longitude], 13);
        },
        function () {
          // ignore errors - stay at default
        }
      );
    }
  }
});
