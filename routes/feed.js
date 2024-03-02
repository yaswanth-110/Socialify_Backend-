const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const feedController = require("../controllers/feed");

router.get("/posts", isAuth, feedController.getPosts);

router.post("/post", isAuth, feedController.uploadPost);

router.put("/post/:postId", feedController.updatePost);

router.delete("/posts/:postId", feedController.deletePost);

module.exports = router;
