const express = require("express");
const router = express.Router();
const { createAgent, getAgents } = require("../controllers/agentController");

// Adding a new sales agent
router.post("/", createAgent);

// Fetching all sales agents
router.get("/", getAgents);

module.exports = router;
