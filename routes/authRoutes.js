import express from "express";
import { registerArtist, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerArtist);

router.post("/login", login);

export default router;
