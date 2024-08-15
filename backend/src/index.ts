import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import searchRoutes from "./routes/searchRoutes";
import consultRoutes from "./routes/consultRoutes";
import reviewRoutes from "./routes/reviewRoutes";
dotenv.config();

export const env = process.env.NODE_ENV || "development";
const MONGO_URI =
  env === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI_DEV;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/schedule", consultRoutes);
app.use("/api/review", reviewRoutes);

const connectionWithRetry = () => {
  console.log(`MongoDB connection with retry`);
  mongoose
    .connect(MONGO_URI!)
    .then(async () => {
      console.log(`Connected to MongoDB (${env})`);

      if (env === "test") {
        try {
          await mongoose.connection.db.dropDatabase();
          console.log("Banco de dados limpo para ambiente de teste");
        } catch (error: any) {
          console.error(`Erro ao limpar banco de dados: ${error}`);
        }
      }
    })
    .catch((error) => {
      console.error(`MongoDB connection error: ${error}`);
      setTimeout(connectionWithRetry, 5000);
    });
};

connectionWithRetry();

export default app;
