import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

//s'enregistrer avec Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

//se connecter avec Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: "Login failed" });
  }
});

export default router;

