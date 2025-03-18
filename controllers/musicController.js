import Music from "../models/musicModel.js";
import asyncHandler from "express-async-handler";

// Upload music (only for registered artists)
export const uploadMusic = asyncHandler(async (req, res) => {
  try {
    const { title, audioUrl, thumbnailUrl, lyrics, genre } = req.body;
    const artist = req.user._id; // Extracted from auth middleware

    if (!title || !audioUrl || !thumbnailUrl) {
      return res.status(400).json({ error: "Title, audio, and thumbnail are required" });
    }

    const music = await Music.create({
      title,
      artist,
      audioUrl,
      thumbnailUrl,
      lyrics,
      genre,
    });

    res.status(201).json(music);
  } catch (error) {
    console.error("Error in uploadMusic:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Retrieve all music
export const getAllMusic = asyncHandler(async (req, res) => {
  try {
    const music = await Music.find().populate("artist", "name");
    res.status(200).json(music);
  } catch (error) {
    console.error("Error in getAllMusic:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Retrieve a single music track by ID
export const getMusicById = asyncHandler(async (req, res) => {
  try {
    const music = await Music.findById(req.params.id).populate("artist", "name");
    if (!music) {
      return res.status(404).json({ error: "Music not found" });
    }
    res.status(200).json(music);
  } catch (error) {
    console.error("Error in getMusicById:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get music by artist
export const getMusicByArtist = asyncHandler(async (req, res) => {
  try {
    const music = await Music.find({ artist: req.params.artistId }).populate("artist", "name");
    res.status(200).json(music);
  } catch (error) {
    console.error("Error in getMusicByArtist:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get music by genre
export const getMusicByGenre = asyncHandler(async (req, res) => {
  try {
    const music = await Music.find({ genre: req.params.genre });
    res.status(200).json(music);
  } catch (error) {
    console.error("Error in getMusicByGenre:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});
