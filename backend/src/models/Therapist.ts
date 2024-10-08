import mongoose, { Document, Schema } from "mongoose";

export interface ITherapist extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  speciality: string[];
  mediumCost: number;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  inscriptionNumber: string;
}

const therapistSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  speciality: { type: Array, required: true },
  mediumCost: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  inscriptionNumber: { type: String, required: true },
});

therapistSchema.index({ location: "2dsphere" });

export default mongoose.model<ITherapist>("Therapist", therapistSchema);
