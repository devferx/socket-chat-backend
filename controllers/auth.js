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

  try {
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "The user does not exist",
      });
    }

    const validPassword = await bcrypt.compare(password, userDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password",
      });
    }

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      msg: "Login successful",
      user: userDB,
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

async function renewToken(req, res = response) {
  const uid = req.uid;

  // Generar un nuevo JWT
  const token = await generateJWT(uid);

  // Obtener el usuario por UID
  const user = await User.findById(uid);

  res.json({
    ok: true,
    user,
    token,
  });
}

module.exports = {
  createUser,
  login,
  renewToken,
};
