import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    (req as any).user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

//Middleware pour vérifier le rôle admin
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied, admin only" });
  }
  next();
};

