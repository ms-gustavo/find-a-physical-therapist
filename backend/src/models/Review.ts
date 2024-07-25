import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  clientId: mongoose.Schema.Types.ObjectId;
  therapistId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  therapistId: {
    type: Schema.Types.ObjectId,
    ref: "Therapist",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IReview>("Review", ReviewSchema);
