const { Router } = require("express");

const router = Router();

// Create new user
router.post("/new", (req, res) => {
  res.json({
    ok: true,
    msg: "User created",
    user: undefined,
  });
});

// Login
router.post("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Login successful",
  });
});

// Revalidate token
router.get("/renew", (req, res) => {
  res.json({
    ok: true,
    msg: "Renew token",
  });
});

module.exports = router;
