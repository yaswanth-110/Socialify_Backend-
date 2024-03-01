const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const email = req.body.mail;
  const username = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        email: email,
        password: hashPassword,
        name: username,
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
