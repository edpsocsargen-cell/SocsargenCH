const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
}


module.exports = { auth, adminOnly };
