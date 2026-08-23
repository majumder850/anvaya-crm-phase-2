const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Lead = require("../models/Lead");

// 1. Adding a Comment to a Lead
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentText, author } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Lead ID format." });
    }

    if (!commentText || typeof commentText !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid input: 'commentText' is required." });
    }

    const leadExists = await Lead.findById(id);
    if (!leadExists) {
      return res.status(404).json({ error: `Lead with ID '${id}' not found.` });
    }

    const authorId = author || leadExists.salesAgent;
    if (!authorId) {
      return res
        .status(400)
        .json({ error: "Author (Sales Agent ID) is required." });
    }

    const newComment = await Comment.create({
      lead: id,
      author: authorId,
      commentText,
    });

    const populatedComment = await Comment.findById(newComment._id).populate(
      "author",
      "name",
    );

    res.status(201).json({
      id: populatedComment._id,
      commentText: populatedComment.commentText,
      author: populatedComment.author ? populatedComment.author.name : null,
      createdAt: populatedComment.createdAt,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 2. Getting All Comments for a Lead
const getCommentsByLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Lead ID format." });
    }

    const leadExists = await Lead.findById(id);
    if (!leadExists) {
      return res.status(404).json({ error: `Lead with ID '${id}' not found.` });
    }

    const comments = await Comment.find({ lead: id })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    const formattedComments = comments.map((c) => ({
      id: c._id,
      commentText: c.commentText,
      author: c.author ? c.author.name : "Unknown",
      createdAt: c.createdAt,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching comments", details: error.message });
  }
};

module.exports = {
  addComment,
  getCommentsByLead,
};
