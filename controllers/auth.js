const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

async function createUser(req, res = response) {
  try {
    const { email, name, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists",
      });
    }

    const user = new User({ email, name, password });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: "User created",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
}

async function login(req = request, res = response) {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login successful",
    email,
    password,
  });
}

async function renewToken(req, res = response) {
  res.json({
    ok: true,
    msg: "Renew token",
  });
}

module.exports = {
  createUser,
  login,
  renewToken,
};
