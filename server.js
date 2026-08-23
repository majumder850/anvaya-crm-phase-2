const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initializeDatabase } = require("./db/db.connect.js");

const app = express();
app.use(express.json());

// 1. Initialize Database
initializeDatabase();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const leadRoutes = require("./routes/leadRoutes");
const agentRoutes = require("./routes/agentRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/leads", leadRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Anvaya CRM API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
