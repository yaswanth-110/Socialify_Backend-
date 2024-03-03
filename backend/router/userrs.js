import express from "express";
import{
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js"
//import isAuth from '../middleware/is-auth.js';
const router=express.Router();
router.get("/:id",getUser);
router.get("/:id/friends",getUserFriends);
router.patch("/:id/:friendId",addRemoveFriend);
export default router;