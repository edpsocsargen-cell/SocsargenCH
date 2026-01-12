const express = require("express");
const db = require("../db");
const { auth, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

// Get announcements (ALL users)
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM announcements ORDER BY created_at DESC",
    (err, result) => {
      res.json(result);
    }
  );
});

// Add announcement (ADMIN only)
router.post("/", auth, adminOnly, (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO announcements (title, content) VALUES (?,?)",
    [title, content],
    () => res.send("Announcement posted")
  );
});

module.exports = router;
