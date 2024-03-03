import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userrs from './router/userrs.js';
import multer from "multer";
import helmet from "helmet";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import {users} from './data/index.js';
import User from "./modal/User.js";
import messageRoute from './router/messages.js';
import conversationRoute from './router/conversations.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;
app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

dotenv.config();
// file storage(multer)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use("/user", userrs);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);
//app.use("/api/messages",messageRoutes);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    // User.insertMany(users); // Optional: Perform actions after connection

    // Start server after successful connection
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });
