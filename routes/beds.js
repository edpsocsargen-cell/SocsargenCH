const express = require('express');
const db = require('../db');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

// Get beds
router.get('/', auth, (req, res) => {
  db.query("SELECT * FROM beds", (err, result) => {
    res.json(result);
  });
});

// Reserve bed
router.post('/reserve', auth, (req, res) => {
  const { bed_id } = req.body;

  db.query(
    "UPDATE beds SET is_available = false WHERE id = ? AND is_available = true",
    [bed_id],
    (err, result) => {
      if (result.affectedRows === 0) {
        return res.send("Bed not available");
      }
      res.send("Bed reserved");
    }
  );
});

module.exports = router;
