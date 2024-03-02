const express = require("express");

const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");

const { validationResult } = require("express-validator");

// const MONGODB_URL =
//   "mongodb+srv://yaswanth:123@cluster0.bvwugob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(bodyParser.json());

app.use(authRoutes);

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
