const { request, response } = require("express");

const Message = require("../models/message");

async function getChat(req = request, res = response) {
  const userId = req.uid;
  const messagesFrom = req.params.from;

  const last30Messages = await Message.find({
    $or: [
      { from: userId, to: messagesFrom },
      { from: messagesFrom, to: userId },
    ],
  })
    .sort({ createdAt: "desc" })
    .limit(30);

  res.json({
    ok: true,
    messages: last30Messages,
  });
}

module.exports = {
  getChat,
};
