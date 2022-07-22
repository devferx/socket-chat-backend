const { request, response } = require("express");
const User = require("../models/user");

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
    await user.save();

    res.json({
      ok: true,
      msg: "User created",
      user,
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
