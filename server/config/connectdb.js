import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_DB_URI) {
  throw new Error("Please provide mongodb URI in .env file");
}

async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Error in connecting DB:", error.message);
    // Do not crash on Vercel, just log error
  }
}

export default connectdb;
