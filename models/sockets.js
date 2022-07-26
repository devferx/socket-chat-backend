class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      // TODO: Validate JWT
      // If token is not valid, disconnect socket
      // TODO: View who user is connected
      // TODO: Emit all user connected
      // TODO: Socket join
      // TODO: Listen when client send a message
      // TODO: Disconnet
      // Set in the DB that the user disconneted
      // TODO: Emit all user conected
    });
  }
}

module.exports = Sockets;
