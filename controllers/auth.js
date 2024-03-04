const User = require("../models/user");
const Friend = require("../models/friend");

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
  console.log(errors);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  //   const confirmPassword = req.body.confirmpassword;
  let sigupnUser;

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
      sigupnUser = userDoc;
      const friend = new Friend({
        userId: userDoc._id,
      });
      return friend.save();
    })
    .then((result) => {
      // transporter.sendMail({
      //   to: email,
      //   from: "no-reply@insta.com",
      //   subject: "signedup successfully",
      //   body: "<h2>Welcome to instagram</h2>",
      // });
      res.status(201).json({
        message: "user account created successfully",
        userId: sigupnUser._id,
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
      res.status(200).json({
        token: token,
        userDetails: loadUser,
        userId: loadUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
