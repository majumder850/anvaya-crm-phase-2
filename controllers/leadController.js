const Lead = require("../models/Lead");

// 1. Create a New Lead
const createLead = async (req, res) => {
  try {
    const { name, source, salesAgent, status, tags, timeToClose, priority } =
      req.body;

    const lead = await Lead.create({
      name,
      source,
      salesAgent,
      status,
      tags,
      timeToClose,
      priority,
    });

    const populatedLead = await Lead.findById(lead._id).populate(
      "salesAgent",
      "name email",
    );

    res.status(201).json({
      data: { lead: populatedLead },
      message: "Lead created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating lead", error: error.message });
  }
};

// 2. Get All Leads
const getLeads = async (req, res) => {
  try {
    const { salesAgent, status, tags, source } = req.query;
    const filter = {};

    if (salesAgent) filter.salesAgent = salesAgent;
    if (status) filter.status = status;
    if (tags) filter.tags = { $in: tags.split(",") };
    if (source) filter.source = source;

    const leads = await Lead.find(filter).populate("salesAgent", "name email");

    res.status(200).json({ data: { leads } });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching leads", error: error.message });
  }
};

// 3. Update a Lead
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const lead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("salesAgent", "name email");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res
      .status(200)
      .json({ data: { lead }, message: "Lead updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating lead", error: error.message });
  }
};

// 4. Delete a Lead
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting lead", error: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
};
