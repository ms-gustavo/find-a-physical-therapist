import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "./models/Client";
import Therapist from "./models/Therapist";
import http from "http";
import app from ".";

dotenv.config();
const env = process.env.NODE_ENV;
let server: http.Server;

beforeAll(async () => {
  const MONGO_URI = process.env.MONGO_URI_TEST!;
  await mongoose.connect(MONGO_URI).then(() => {
    console.log(`Connected to MongoDB ${env}`);
  });

  server = app.listen(5001, () => {
    console.log(`Test server running on port 5001`);
  });
});

afterAll(async () => {
  await Client.deleteMany({});
  await Therapist.deleteMany({});
  await mongoose.connection.close().then(() => {
    console.log(`Disconnected from MongoDB ${env}`);
  });
  server.close();
});
