const SalesAgent = require("../models/SalesAgent");

// 1. Creating a New Sales Agent
const createAgent = async (req, res) => {
  try {
    const { name, email } = req.body;

    const agent = await SalesAgent.create({
      name,
      email,
    });

    res.status(201).json({
      id: agent._id,
      name: agent.name,
      email: agent.email,
      createdAt: agent.createdAt,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: `Sales agent with email '${req.body.email}' already exists.`,
      });
    }
    res.status(400).json({
      error: `Invalid input: ${error.message}`,
    });
  }
};

// 2. Getting All Sales Agents
const getAgents = async (req, res) => {
  try {
    const agents = await SalesAgent.find({});
    const formattedAgents = agents.map((agent) => ({
      id: agent._id,
      name: agent.name,
      email: agent.email,
    }));

    res.status(200).json(formattedAgents);
  } catch (error) {
    res.status(400).json({
      error: "Error fetching sales agents",
      message: error.message,
    });
  }
};

module.exports = {
  createAgent,
  getAgents,
};
