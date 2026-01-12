const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
  const { user_id, doctor, date } = req.body;
  db.query(
    "INSERT INTO appointments (user_id, doctor, date) VALUES (?,?,?)",
    [user_id, doctor, date],
    () => res.send("Appointment requested")
  );
});

router.get('/', (req, res) => {
  db.query("SELECT * FROM appointments", (err, result) => {
    res.json(result);
  });
});

router.put('/:id', (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE appointments SET status=? WHERE id=?",
    [status, req.params.id],
    () => res.send("Appointment updated")
  );
});

module.exports = router;
