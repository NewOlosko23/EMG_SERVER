import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { createToken } from "../middlewares/middleware.js";
import dotenv from "dotenv";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Register a new user (artist)
export const registerArtist = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    const token = createToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(500).json({ error: "User registration failed" });
  }
});

// Login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if logging in as admin
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = createToken("admin");
    return res.status(200).json({
      _id: "admin",
      name: "Admin",
      email: ADMIN_EMAIL,
      role: "admin",
      token,
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = createToken(user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});
