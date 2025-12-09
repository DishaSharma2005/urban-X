const Report = require("../models/Report");
const crypto = require("crypto");

module.exports.createReport = async (req, res) => {
  try {
    const {
      title,
      description,
      lat,
      lng,
      category,
      subCategory,
      placeName,
    } = req.body;

    // Generate hash for tamper-proof record
    const hash = crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          title,
          description,
          category,
          subCategory,
          lat,
          lng,
          ts: Date.now(),
        })
      )
      .digest("hex");

    const report = new Report({
      title,
      description,
      category,
      subCategory,
      placeName,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)], // ensure numeric
      },
      createdBy: req.user ? req.user._id : null,
      hash,
      auditLogs: [{ action: "created", hash }],
    });

    // Handle file upload (local storage demo OR Cloudinary later)
    if (req.file) {
      report.image = "/uploads/" + req.file.filename; // local storage path
    }

    // If multiple uploads in future
    if (req.files && req.files.length > 0) {
      report.photos = req.files.map((f) => f.path || f.filename);
    }

    await report.save();

    req.flash("success", "Report created successfully!");
    res.redirect("/reports");
} catch (err) {
  console.error("Error creating report:", err);
  res.status(500).send("Error: " + err.message);
}

    //res.redirect("/reports/new");
  //}
};


module.exports.listReports = async (req, res) => {
  const reports = await Report.find({});
  res.render("reports/index", { reports });
};
module.exports.listMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ createdBy: req.user._id });

    res.render("reports/myReports", { reports });
  } catch (err) {
    console.error("Error fetching user reports:", err);
    req.flash("error", "Could not load your reports");
    res.redirect("/reports");
  }
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

// Return JSON data for heatmap
module.exports.getHeatmapData = async (req, res) => {
  try {
    const reports = await Report.find({}, "location priority status");

    const data = reports.map(r => ({
      lat: r.location.coordinates[1],
      lng: r.location.coordinates[0],
      priority: r.priority,
      status: r.status
    }));

    res.json(data);
  } catch (err) {
    console.error("Heatmap error:", err);
    res.status(500).json({ error: "Failed to load heatmap data" });
  }
};



