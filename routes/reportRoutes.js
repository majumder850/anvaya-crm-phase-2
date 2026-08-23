const express = require("express");
const router = express.Router();
const {
  getClosedLastWeek,
  getPipelineCount,
} = require("../controllers/reportController");

router.get("/last-week", getClosedLastWeek);
router.get("/pipeline", getPipelineCount);

module.exports = router;
