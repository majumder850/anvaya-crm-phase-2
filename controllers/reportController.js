const Lead = require("../models/Lead");

// 1. Getting Leads Closed Last Week
const getClosedLastWeek = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const closedLeads = await Lead.find({
      status: "Closed",
      $or: [
        { closedAt: { $gte: sevenDaysAgo } },
        { updatedAt: { $gte: sevenDaysAgo }, closedAt: { $exists: false } },
      ],
    }).populate("salesAgent", "name");

    const formattedLeads = closedLeads.map((lead) => ({
      id: lead._id,
      name: lead.name,
      salesAgent: lead.salesAgent ? lead.salesAgent.name : "Unassigned",
      closedAt: lead.closedAt || lead.updatedAt,
    }));

    res.status(200).json(formattedLeads);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching closed leads report",
      details: error.message,
    });
  }
};

// 2. Getting Total Leads
const getPipelineCount = async (req, res) => {
  try {
    const count = await Lead.countDocuments({
      status: { $ne: "Closed" },
    });

    res.status(200).json({
      totalLeadsInPipeline: count,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error fetching pipeline report",
      details: error.message,
    });
  }
};

module.exports = {
  getClosedLastWeek,
  getPipelineCount,
};
