import express from "express";
import {
  uploadMusic,
  getAllMusic,
  getMusicById,
  getMusicByArtist,
  getMusicByGenre,
} from "../controllers/musicController.js";

const router = express.Router();

// Route to upload music (No protection for now)
router.post("/upload", uploadMusic);

// Route to get all music
router.get("/", getAllMusic);

// Route to get a single music track by ID
router.get("/:id", getMusicById);

// Route to get music by artist
router.get("/artist/:artistId", getMusicByArtist);

// Route to get music by genre
router.get("/genre/:genre", getMusicByGenre);

export default router;
