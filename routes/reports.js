const express = require("express");
const router = express.Router();
//const reports = require("../controllers/reportsController");

const reportsController = require("../controllers/reportsController");
// Show all reports
router.get("/", reportsController.listReports);

// Show form
router.get("/new", reportsController.newReportForm);

// Create report
router.post("/", reportsController.createReport);

router.get("/heatmap", reportsController.heatmapData); // JSON
router.get("/map", reportsController.mapView);    
module.exports = router;
