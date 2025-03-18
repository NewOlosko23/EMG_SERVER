import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Get all artists
export const getAllArtists = asyncHandler(async (req, res) => {
  try {
    const artists = await User.find({ role: "artist" }).select("-password");
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve artists" });
  }
});

// Get a single artist by ID
export const getArtistById = asyncHandler(async (req, res) => {
  try {
    const artist = await User.findById(req.params.id).select("-password");
    if (!artist || artist.role !== "artist") {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve artist" });
  }
});

// Get a single artist by username
export const getArtistByUsername = asyncHandler(async (req, res) => {
  try {
    const artist = await User.findOne({ name: req.params.username }).select("-password");
    if (!artist || artist.role !== "artist") {
      return res.status(404).json({ error: "Artist not found" });
    }
    res.status(200).json(artist);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve artist" });
  }
});
