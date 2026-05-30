import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { isAdmin } from "./middleware/roleMiddleware.js";

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
