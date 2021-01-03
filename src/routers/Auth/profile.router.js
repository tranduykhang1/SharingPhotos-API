const express = require("express");
const router = express.Router();


const { isVerify } = require("../../middleware/verifyToken.js");
const { updateProfile, getProfile, updateAvatar, updateHobbies, getUserById } = require("../../controller/Auth/profile.controller");
const { uploadPhotoMulter } = require("../../config/multer.config")


router.get("/profile", isVerify, getProfile);
router.get("/user/", getUserById);
router.put("/update-profile", isVerify, uploadPhotoMulter, updateProfile);

router.put('/update-avatar', isVerify, uploadPhotoMulter, updateAvatar)
router.put('/update-hobbies', isVerify, updateHobbies)


module.exports = router;