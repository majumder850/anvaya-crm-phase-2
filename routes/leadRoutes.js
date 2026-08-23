const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

// Create a new lead
router.post("/", createLead);

// Fetch all leads
router.get("/", getLeads);

// Update an existing lead
router.put("/:id", updateLead);

// Delete a lead
router.delete("/:id", deleteLead);

module.exports = router;
