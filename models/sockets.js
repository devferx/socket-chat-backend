const {
  userConnected,
  userDisconnected,
  getUsers,
} = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", async (socket) => {
      const [isValid, uid] = verifyJWT(socket.handshake.query["x-token"]);

      if (!isValid) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      await userConnected(uid);

      console.log("Cliente conectado", uid);
      // TODO: Validate JWT
      // If token is not valid, disconnect socket
      // TODO: View who user is connected
      // TODO: Emit all user connected
      this.io.emit("user-list", await getUsers());
      // TODO: Socket join
      // TODO: Listen when client send a message
      // TODO: Disconnet
      // Set in the DB that the user disconneted
      // TODO: Emit all user conected

      socket.on("disconnect", async () => {
        await userDisconnected(uid);
        this.io.emit("user-list", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
