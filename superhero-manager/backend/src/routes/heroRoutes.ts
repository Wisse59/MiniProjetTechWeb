import express from "express";
import { getHeroes, getHeroById, createHero, updateHero, deleteHero } from "../controllers/heroController";
import { adminMiddleware } from "../middleware/auth";
import { upload } from "../middleware/upload"; // 🔹 nouveau import

const router = express.Router();

router.get("/", getHeroes);
router.get("/:id", getHeroById);

//Seuls les admins peuvent créer, modifier ou supprimer
router.post("/", adminMiddleware, upload.single("image"), createHero);
router.put("/:id", adminMiddleware, updateHero);
router.delete("/:id", adminMiddleware, deleteHero);

export default router;

