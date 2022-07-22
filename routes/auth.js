const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { createUser, login, renewToken } = require("../controllers/auth");

// Middlewares
const { fieldValidator } = require("../middlewares/fieldValidator");

const router = Router();

// Create new user
router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldValidator,
  ],
  createUser
);

// Login
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldValidator,
  ],
  login
);

// Revalidate token
router.get("/renew", renewToken);

module.exports = router;
