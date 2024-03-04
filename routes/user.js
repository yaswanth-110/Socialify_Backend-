const express = require("express");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const userController = require("../controllers/user");
const user = require("../models/user");

router.get("/userProfile", isAuth, userController.getuserProfile);

router.put("/userProfile", isAuth, userController.updateuserProfile);

router.get("/:username", isAuth, userController.getUser);

router.put("/:username", isAuth, userController.userFriendReqSent);

router.put("/accept/:username", isAuth, userController.userFriendReqAccept);

router.put("/reject/:username", isAuth, userController.userFriendReqReject);

router.get("/search/:userparam", isAuth, userController.getSearchUser);

module.exports = router;
