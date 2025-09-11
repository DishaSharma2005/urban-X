const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
//const reports = require("../controllers/reportsController");

const reportsController = require("../controllers/reportsController");
// Show all reports
router.get("/", reportsController.listReports);

// Show form
router.get("/new", reportsController.newReportForm);


// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));  // save to /uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), reportsController.createReport);

// Create report
router.post("/", reportsController.createReport);

router.get("/heatmap", reportsController.heatmapData); // JSON
router.get("/heatmap", reportsController.getHeatmapData);
router.get("/map", reportsController.mapView);    
module.exports = router;
