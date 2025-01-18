const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static("public"));

// Listen for socket connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Broadcast messages to other users
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});