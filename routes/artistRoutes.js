import express from "express";
import { getAllArtists, getArtistById, getArtistByUsername } from "../controllers/artistController.js";

const router = express.Router();

router.get("/", getAllArtists);
router.get("/:id", getArtistById);
router.get("/username/:username", getArtistByUsername);

export default router;
