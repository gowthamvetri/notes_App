import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverlsess-http";
import connectdb from "./config/connectdb.js";
import userRout from "./routs/user.route.js";
import notesRoute from "./routs/notes.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Connect to Mongo
connectdb();

// Routes
app.get("/", (req, res) => {
  return res.json({ message: "Hello from Server 🚀" });
});

app.use("/api/user", userRout);
app.use("/api/notes", notesRoute);

// ✅ Do NOT app.listen() on Vercel
export const handler = serverless(app);
export default app;
