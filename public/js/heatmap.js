// public/js/heatmap.js
document.addEventListener("DOMContentLoaded", async () => {
  const mapEl = document.getElementById("heatmap");
  if (!mapEl) return;

  // init map
  const map = L.map("heatmap").setView([20.5937, 78.9629], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  try {
    const res = await fetch("/reports/heatmap");
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      const heat = L.heatLayer(data, { radius: 25 }).addTo(map);
      map.fitBounds(data.map(d => [d[0], d[1]]));
    } else {
      alert("No reports available yet.");
    }
  } catch (err) {
    console.error("Failed to load heatmap data:", err);
  }
});
