import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function CreateUser(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name, email, and password",
        error: true,
      });
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email already exists",
        error: true,
      });
    }

    // 🔹 Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // 🔹 Store hashed password
    });

    await newUser.save();

    const accessKey = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" } // ⏳ Token expires in 1 hour
    );

    return res.json({
      error: false,
      user: { name, email, id: newUser._id },
      accessKey,
      message: "Registration Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: true,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide email and password",
        error: true,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
      });
    }

    // 🔹 Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
      });
    }

    // 🔹 Generate JWT Token
    const accessKey = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login Successful",
      error: false,
      user: { name: user.name, email: user.email, id: user._id },
      accessKey,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: true,
    });
  }
}

export async function getUser(req, res) {
  try {
    // 🔹 Extract user ID from decoded JWT
    const user = await userModel.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    return res.json({
      message: "User found",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: true,
    });
  }
}
