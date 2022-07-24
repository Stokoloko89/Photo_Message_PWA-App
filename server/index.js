// Static express server
const express = require("express");
const socketio = require("socket.io");
const http = require("http");

// Create HTTP server
const app = express();
const server = http.Server(app);

// Create websocket server
const io = socketio(server);

// Init server messages
const messages = []

// Listen for new socket client (connections)
io.on("connection", (socket) => {
  // Listen for new messages
  socket.on("new_message", (message) => {
    // Add to messages queue
    messages.unshift(message);

    // Broadcast new message to all clients
    socket.broadcast.emit("new_message", message);
  });
});

// Server 'app' directory
app.use(express.static(`${__dirname}/../app`));

// Server 'node_modules' directory
app.use("/modules", express.static(`${__dirname}/../node_modules`));

// Start Server
server.listen(8000, () =>
  console.log("Photo Message running on localhost:8000")
);
