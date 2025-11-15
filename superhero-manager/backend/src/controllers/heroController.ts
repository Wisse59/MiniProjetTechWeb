import { Request, Response } from "express";
import Hero from "../models/Hero";

//lecture de tous les héros
export const getHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

//pour lire un héros, en entrant son ID
export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ error: "Héros non trouvé" });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

//création d'un héros
export const createHero = async (req: Request, res: Response) => {
  try {
    const heroData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null // 🔹 ajout du chemin de l'image
    };

    const hero = new Hero(heroData);
    await hero.save();
    res.status(201).json(hero);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création" });
  }
};


//pour mettre a jour les infos d'un héros
export const updateHero = async (req: Request, res: Response) => {
  try {
    const updateData = {
      ...req.body,
      ...(req.file ? { image: `/uploads/${req.file.filename}` } : {}) // 🔹 si nouvelle image
    };

    const hero = await Hero.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!hero) return res.status(404).json({ error: "Héros non trouvé" });
    res.json(hero);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
  }
};

//la suppression d'un héros
export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ error: "Héros non trouvé" });
    res.json({ message: "Héros supprimé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
