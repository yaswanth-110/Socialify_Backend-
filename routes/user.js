const express = require("express");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/userProfile", isAuth, userController.getuserProfile);

router.put("/userProfile", isAuth, userController.updateuserProfile);

router.get("/:username", isAuth, userController.getUser);

// router.put("/:username", isAuth, userController.userFollowAndFollwer);

// router.put("/friends/:username", isAuth, userController.postFriends);

module.exports = router;
