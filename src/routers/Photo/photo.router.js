const express = require("express");
const router = express.Router();


const { isVerify } = require("../../middleware/verifyToken.js");
const { uploadPhoto, getPhotoByAlbum, removePhoto, searchPhoto } = require("../../controller/Photo/photo.controller.js");
const { uploadPhotoMulter } = require("../../config/multer.config");




router.post("/upload-photo", isVerify, uploadPhotoMulter, uploadPhoto);
router.get("/get-photo-by-album", isVerify, uploadPhotoMulter, getPhotoByAlbum);
router.delete("/remove-photo", isVerify, uploadPhotoMulter, removePhoto);
router.get("/search", isVerify, uploadPhotoMulter, searchPhoto);



module.exports = router;