import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  id: number;
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string[];
  description: string;
  image: string;
  origine: string;
  premiereApparition: string;
}

const HeroSchema: Schema = new Schema({
  id: { type: Number },
  nom: { type: String, required: true }, // ancien "name"
  alias: { type: String },               // ancien "biography.fullName"
  univers: { type: String },             // ancien "biography.publisher"
  pouvoirs: { type: [String], default: [] }, // ancien "powerstats"
  description: { type: String },         // ancien "work.occupation" ou "biography.alterEgos"
  image: { type: String },               // ancien "images.lg"
  origine: { type: String },             // ancien "biography.placeOfBirth"
  premiereApparition: { type: String }   // ancien "biography.firstAppearance"
});

export default mongoose.model<IHero>("Hero", HeroSchema, "heroes");

