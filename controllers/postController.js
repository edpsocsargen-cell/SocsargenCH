exports.createPost = (req, res) => {
  const { content } = req.body;
  db.query(
    "INSERT INTO posts (user_id, content) VALUES (?,?)",
    [req.user.id, content],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Post created" });
    }
  );
};
