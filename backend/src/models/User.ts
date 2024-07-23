import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "CLIENT" | "THERAPIST";
  speciality?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  speciality: { type: String },
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
});

userSchema.index({ location: "2dsphere" });

export default mongoose.model<IUser>("User", userSchema);
