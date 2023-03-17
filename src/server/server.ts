import express from "express";
import { set, connect, ConnectOptions } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import { appRouter } from "./routes/appRouter.js";

config();

const { PORT = 5001, MONGODB_KEY = "" } = process.env;

if (!MONGODB_KEY) {
  console.error("MONGODB_KEY is missing in the environment variables");
  process.exit(1);
}

set("strictQuery", true);

const app = express();
app.use(cors());
app.use(express.json());

try {
  await connect(MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  console.log("Connected to the database");
} catch (err) {
  console.error("Error connecting to the database:", err);
}

app.use("/api", appRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
