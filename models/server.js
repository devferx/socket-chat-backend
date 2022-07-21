const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const Sockets = require("./sockets");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Conectar a DB
    dbConnection();

    // HTTP Server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /*configuraciones*/
      cors: {
        origin: "*",
        methods: "GET, POST, PUT, DELETE, OPTIONS",
      },
    });
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  middlewares() {
    // Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());

    // API: Endpoints
    this.app.use("/api/login", require("../routes/auth"));
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    this.configurarSockets();

    this.server.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
