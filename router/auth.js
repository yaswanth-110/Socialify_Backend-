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
      .withMessage("Please enter a valid message")
      .normalizeEmail(),
    body(
      "password",
      "please enter a password with only numbers and text and at least 5 characters"
    )
      .trim()
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("name").trim().not().isEmpty(),
    body("username").trim().not().isEmpty(),
    body("confirmPassword").custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("passwords have to match");
      }
    }),
    body("username").custom((value, { req }) => {
      User.findOne({ username: value })
        .then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "This username is already in use,please enter a unique username"
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;