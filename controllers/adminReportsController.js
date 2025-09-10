const Report = require("../models/Report");
const crypto = require("crypto");

// Utility to append tamper-proof hash log
function addAuditLog(report, action) {
  const prevHash = report.auditLogs.length
    ? report.auditLogs[report.auditLogs.length - 1].hash
    : "";
  const newHash = crypto
    .createHash("sha256")
    .update(JSON.stringify({ action, prevHash, ts: Date.now() }))
    .digest("hex");

  report.auditLogs.push({ action, hash: newHash });
  report.hash = newHash; // latest hash snapshot
}

module.exports.listReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.render("admin/reports/index", { reports });
  } catch (err) {
    console.error("Admin list error:", err);
    res.status(500).send("Error loading reports");
  }
};

module.exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // new status from form

    const report = await Report.findById(id);
    if (!report) {
      req.flash("error", "Report not found");
      return res.redirect("/admin/reports");
    }

    report.status = status;
    addAuditLog(report, `status changed to ${status}`);
    await report.save();

    req.flash("success", "Report status updated");
    res.redirect("/admin/reports");
  } catch (err) {
    console.error("Update status error:", err);
    req.flash("error", "Failed to update report");
    res.redirect("/admin/reports");
  }
};
