const express = require("express");

const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");

const { validationResult } = require("express-validator");

const MONGODB_URL =
  "mongodb+srv://kethankumarreddy392002:IzGwyMpXb2YeZN0c@cluster0.0mmik9m.mongodb.net/socialMediaDb";
app.use(bodyParser.json());

app.use(authRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected");
    app.listen(3000, (err) => {
      console.log("server is listening to port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
