import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const connectionWithRetry = () => {
  console.log(`MongoDB connection with retry`);
  mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
      console.log(`Connected to MongoDB`);
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(`MongoDB connection error: ${error}`);
      setTimeout(connectionWithRetry, 5000);
    });
};

connectionWithRetry();
