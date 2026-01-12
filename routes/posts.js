const express = require('express');
const db = require('../db');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/authMiddleware');
const { createPost } = require("../controllers/postController");

router.post("/", auth, createPost);

router.get('/', auth, adminOnly, (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    res.json(result);
  });
});

router.put('/:id', auth, adminOnly, (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE posts SET status=? WHERE id=?",
    [status, req.params.id],
    () => res.send("Post updated")
  );
});

router.post('/', auth, (req, res) => {
  const user_id = req.user.id;
  const { content } = req.body;
  db.query(
    "INSERT INTO posts (user_id, content) VALUES (?,?)",
    [user_id, content],
    () => res.send("Post submitted")
  );
});


router.get('/', (req, res) => {
  db.query("SELECT * FROM posts", (err, result) => {
    res.json(result);
  });
});

router.put('/:id', (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE posts SET status=? WHERE id=?",
    [status, req.params.id],
    () => res.send("Post updated")
  );
});

module.exports = router;
