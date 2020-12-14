const express = require("express");
const { followUser, listFollow, removeFollow } = require("../../controller/Follow/follow.controller.js");
const router = express.Router();


const { isVerify } = require("../../middleware/verifyToken.js");




router.get("/list-follow", isVerify, listFollow);
router.post("/follow", isVerify, followUser);
router.delete("/remove-follow", isVerify, removeFollow);




module.exports = router;