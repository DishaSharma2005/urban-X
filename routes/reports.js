const express = require("express");
const router = express.Router();
const reports = require("../controllers/reportsController");

// Show all reports
router.get("/", reports.listReports);

// Show form
router.get("/new", reports.newReportForm);

// Create report
router.post("/", reports.createReport);

module.exports = router;
