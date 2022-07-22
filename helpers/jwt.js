const jwt = require("jsonwebtoken");

function generateJWT(uid) {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("Error generating JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
}

module.exports = {
  generateJWT,
};
