const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer.middleware");
const {
  getGeneralAtsScore,
  getJobSpecificAtsScore,
} = require("../controllers/ats.controller");

// POST /api/ats/general
// Uploads 'resume' file
router.post("/general", upload.single("resume"), getGeneralAtsScore);

// POST /api/ats/job-specific
// Uploads 'resume' file, expects 'jobDescription' in body
router.post("/job-specific", upload.single("resume"), getJobSpecificAtsScore);

module.exports = router;
