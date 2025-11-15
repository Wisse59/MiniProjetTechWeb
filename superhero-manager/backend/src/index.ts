import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import heroRoutes from "./routes/heroRoutes";
import authRoutes from "./routes/authRoutes";
import { authMiddleware, adminMiddleware } from "./middleware/auth";

dotenv.config();
const app = express();

//les middlewares
app.use(cors());
app.use(express.json());
app.use("/api/heroes", authMiddleware, heroRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("src/uploads"));

//on se connecte à la base de donnée
connectDB();

//la route test
app.get("/", (req, res) => {
  res.send("SuperHeroManager API fonctionne !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur port ${PORT}`));

