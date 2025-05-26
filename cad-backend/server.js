require("dotenv").config();  // Load environment variables from .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Initialize Express App
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());         // Enable Cross-Origin Resource Sharing

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Load Routes
app.use("/api/auth", require("./routes/auth"));      // Authentication Routes
app.use("/api/models", require("./routes/models"));  // 3D Model Upload & Management
// app.use("/api/ai", require("./routes/ai"));          // AI Optimization API
// app.use("/api/print", require("./routes/print"));    // 3D Printing API

// 🌐 Real-Time Collaboration with Socket.IO
const io = new Server(server, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log(`👤 User Connected: ${socket.id}`);

    socket.on("edit", (data) => {
        console.log(`✏️ Model Updated by ${data.user}: ${data.action}`);
        io.emit("update", data); // Broadcast changes to all users
    });

    socket.on("disconnect", () => {
        console.log(`🚪 User Disconnected: ${socket.id}`);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
