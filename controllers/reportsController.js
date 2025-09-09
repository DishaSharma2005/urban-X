const Report = require("../models/Report");
const crypto = require("crypto");

module.exports.createReport = async (req, res) => {
  try {
    const { title, description, lat, lng } = req.body;

    // Generate hash for tamper-proof record
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify({ title, description, lat, lng, ts: Date.now() }))
      .digest("hex");

    const report = new Report({
      title,
      description,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      createdBy: req.user ? req.user._id : null,
      hash,
      auditLogs: [{ action: "created", hash }],
    });

    await report.save();

    req.flash("success", "Report created successfully!");
    res.redirect("/reports");
  } catch (err) {
    console.error("Error creating report:", err);
    req.flash("error", "Could not create report.");
    res.redirect("/reports/new");
  }
};

module.exports.listReports = async (req, res) => {
  const reports = await Report.find({});
  res.render("reports/index", { reports });
};

module.exports.newReportForm = (req, res) => {
  res.render("reports/new");
};
module.exports.heatmapData = async (req, res) => {
  try {
    const reports = await Report.find({}, "lat lng");
    const data = reports
      .filter(r => r.lat && r.lng)
      .map(r => [parseFloat(r.lat), parseFloat(r.lng)]);
    res.json(data);
  } catch (err) {
    console.error("Error fetching heatmap data:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.mapView = (req, res) => {
  res.render("reports/map"); // new map.ejs view
};

