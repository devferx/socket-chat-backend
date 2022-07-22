const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { createUser, login, renewToken } = require("../controllers/auth");

const router = Router();

// Create new user
router.post("/new", createUser);

// Login
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  login
);

// Revalidate token
router.get("/renew", renewToken);

module.exports = router;
