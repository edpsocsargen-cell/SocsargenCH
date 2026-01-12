const express = require('express');
const db = require('../db');
const { auth, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// Get doctors (users + admin)
router.get('/', auth, (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    res.json(result);
  });
});

// Add doctor (admin only)
router.post('/', auth, adminOnly, (req, res) => {
  const { name, specialization } = req.body;
  db.query(
    "INSERT INTO doctors (name, specialization) VALUES (?,?)",
    [name, specialization],
    () => res.send("Doctor added")
  );
});

module.exports = router;
