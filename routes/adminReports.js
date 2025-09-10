// const express = require("express");
// const router = express.Router();

// // Temporary test route
// router.get("/", (req, res) => {
//   res.send("Admin Reports route working ✅");
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const adminReports = require("../controllers/adminReportsController");

// Show all reports
router.get("/", adminReports.listReports);

// Update status
router.post("/:id/status", adminReports.updateStatus);

module.exports = router;
