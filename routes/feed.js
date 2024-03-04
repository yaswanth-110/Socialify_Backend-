const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const feedController = require("../controllers/feed");

router.get("/posts", isAuth, feedController.getPosts);

router.get("/:postId", isAuth, feedController.getPost);

router.get("edit-post/post", isAuth, feedController.getEditPost);

router.put("/post/like/:postId", isAuth, feedController.likedPost);

router.put("/post/comment/:postId", isAuth, feedController.commentPost);

router.post("/post", isAuth, feedController.uploadPost);

router.put("/:postId", isAuth, feedController.updatePost);

router.delete("/:postId", isAuth, feedController.deletePost);

module.exports = router;
