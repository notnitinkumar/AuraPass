import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { isAdmin } from "./middleware/roleMiddleware.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import { Server } from "socket.io";
import http from "http";
import { initSocket } from "./socket.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");

    res.json({
      message: "Server Running",

      db: "Connected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Database Connection Failed",

      error: error.message,
    });
  }
});
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
app.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use('/bookings', bookingRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

initSocket(io);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
