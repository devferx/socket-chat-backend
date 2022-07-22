const { response } = require("express");

async function createUser(req, res = response) {
  res.json({
    ok: true,
    msg: "User created",
    user: undefined,
  });
}

async function login(req, res = response) {
  res.json({
    ok: true,
    msg: "Login successful",
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
