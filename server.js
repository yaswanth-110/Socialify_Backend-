const express = require("express");
const path = require("path");

const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const feedRoutes = require("./routes/feed");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, res) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/feed", feedRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const errorData = err.data;

  res.status(status).json({ message: message, errorData: errorData });
});
mongoose
  .connect(
    "mongodb+srv://209x1a2830:yash1234@cluster0.c56vvqy.mongodb.net/socialMediaDb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected");
    app.listen(3000, (err) => {
      console.log("server is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
