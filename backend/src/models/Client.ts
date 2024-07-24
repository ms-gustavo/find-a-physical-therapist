import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  password: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

const clientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: false,
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
});

clientSchema.index({ location: "2dsphere" });

export default mongoose.model<IClient>("Client", clientSchema);
