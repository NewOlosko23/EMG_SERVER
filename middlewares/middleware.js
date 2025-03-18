import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const maxAge = 24 * 60 * 60; // 1 day in seconds

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // Check if token is in Authorization header (Bearer Token)
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    const user = await User.findById(decoded.id).select("-password"); // Exclude password for security

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.user = user; // Attach user data to request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
});

export { createToken, protect };
