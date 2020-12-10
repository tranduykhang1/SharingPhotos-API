const express = require("express");
const router = express.Router();


const { isVerify } = require("../../middleware/verifyToken.js");
const { uploadPhoto } = require("../../controller/Photo/photo.controller.js");
const { uploadPhotoMulter } = require("../../config/multer.config");




router.post("/upload-photo", isVerify, uploadPhotoMulter, uploadPhoto);



module.exports = router;