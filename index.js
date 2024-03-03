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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;
//Socket.io



app.use(express.static(path.resolve("./public")));
app.get("/",(req,res)=>{
  return res.sendFile("/public/index.html");
})
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

dotenv.config();
const httpServer = http.createServer(app); // Create the HTTP server
const io = new Server(httpServer); // Create the Socket.IO server
io.on("connection",(socket)=>{
  socket.on("user-message",(message)=>{
    console.log("A new User Message",message);
    io.emit("message",message);
  });
});
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
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    // User.insertMany(users); // Optional: Perform actions after connection

    // Start server after successful connection
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });
