const { Router } = require("express");

// Controllers
const { createUser, login, renewToken } = require("../controllers/auth");

const router = Router();

// Create new user
router.post("/new", createUser);

// Login
router.post("/", login);

// Revalidate token
router.get("/renew", renewToken);

module.exports = router;
