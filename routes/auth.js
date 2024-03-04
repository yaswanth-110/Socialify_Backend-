const express = require("express");

const router = express.Router();

const User = require("../models/user");

const { body, validationResult } = require("express-validator");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("This email is already exists");
          }
        });
      }),
    body(
      "password",
      "please enter a password with only numbers and text and at least 5 characters"
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),

    body("name").trim().not().isEmpty(),
    body("username")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((user) => {
          if (user) {
            return Promise.reject("This username is already in use");
          }
        });
      }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
