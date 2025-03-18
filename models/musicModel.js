import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    audioUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    lyrics: { type: String },
    genre: { type: String },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;