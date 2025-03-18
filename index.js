import express from 'express'
import dotenv from "dotenv";
import cors from "cors";
import mongoose from 'mongoose';

dotenv.config();

import Auth from "./routes/authRoutes.js"
import Music from "./routes/musicRoutes.js"
import Artist from "./routes/artistRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

if (!URI) {
  console.error("MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.error("Database Connection Error:", error.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working well!" });
});


app.use("/api/v1/auth", Auth)
app.use("/api/v1/music/", Music)
app.use("/api/v1/artist/", Artist)