import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "./models/Client";
import Therapist from "./models/Therapist";

dotenv.config();

beforeAll(async () => {
  const env = process.env.NODE_ENV;
  const MONGO_URI = process.env.MONGO_URI_TEST!;
  await mongoose.connect(MONGO_URI).then(() => {
    console.log(`Connected to MongoDB ${env}`);
  });
});

afterAll(async () => {
  await Client.deleteMany({});
  await Therapist.deleteMany({});
  await mongoose.connection.close();
});
