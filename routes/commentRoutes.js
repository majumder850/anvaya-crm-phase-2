const express = require("express");
const router = express.Router();
const {
  addComment,
  getCommentsByLead,
} = require("../controllers/commentController");

router.post("/:id/comments", addComment);
router.get("/:id/comments", getCommentsByLead);

module.exports = router;
