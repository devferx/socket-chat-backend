/**
 * Path: api/messages
 */
const { Router } = require("express");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { getChat } = require("../controllers/messages");

const router = Router();

router.get("/:from", jwtValidator, getChat);

module.exports = router;
