const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const feedController = require("../controllers/feed");

// router.get("/posts", isAuth, feedController.getPosts);

router.post("/post", feedController.uploadPost);

router.put("/posts", feedController.updatePost);

// router.delete("/posts", isAuth, feedController.deletePost);

module.exports = router;
