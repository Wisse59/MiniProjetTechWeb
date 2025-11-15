import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connecté !");
  } catch (err) {
    console.error("Erreur de connexion MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;

