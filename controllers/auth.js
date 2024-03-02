const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const sendGridTransport = require("nodemailer-sendgrid-transport");

const { validationResult } = require("express-validator");

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Please enter a valid email");
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }
  console.log(error.array());
  const email = req.body.email;
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        email: email,
        password: hashPassword,
        name: name,
        username: username,
      });
      return user.save();
    })
    .then((userDoc) => {
      res.status(201).json({
        message: "user account created successfully",
        userId: userDoc._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not found");
        error.statusCode = 401;
        throw error;
      }
      loadUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadUser.email,
          userId: loadUser._id.toString(),
        },
        "supersecretkey",
        { expiresIn: "1hr" }
      );
      res.status(200).json({ token: token, userId: loadUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
