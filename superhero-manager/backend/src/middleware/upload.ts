import multer from "multer";
import path from "path";

//Destination des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // dossier racine /uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nom unique
  }
});

//Filtrer les types de fichiers (images uniquement)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });

