import mongoose, { Schema, Document } from "mongoose";

export interface IConsultation extends Document {
  clientId: mongoose.Types.ObjectId;
  therapistId: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
}

const consultationSchema: Schema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
});

export default mongoose.model<IConsultation>(
  "Consultation",
  consultationSchema
);
