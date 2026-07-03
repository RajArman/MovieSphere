import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};

const sendTokenCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  res.cookie("token", token, {
    ...cookieOptions,
    maxAge: COOKIE_MAX_AGE,
  });
};

const formatUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
});

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    const user = await User.create({ username, email, password });

    sendTokenCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    sendTokenCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    ...cookieOptions,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    success: true,
    user: formatUser(req.user),
  });
};