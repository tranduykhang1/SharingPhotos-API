const express = require("express");
const router = express.Router();


const { isVerify } = require("../../middleware/verifyToken.js");
const {
    uploadPhoto,
    getPhotoByAlbum,
    removePhoto,
    searchPhoto,
    getAllPhoto,
    getPhotoById,
    getPhotoByFollowing,
    savePhoto,
    getListSearch
} = require("../../controller/Photo/photo.controller.js");
const { uploadPhotoMulter } = require("../../config/multer.config");




router.post("/upload-photo", isVerify, uploadPhotoMulter, uploadPhoto);
router.get("/get-photo-by-album", isVerify, getPhotoByAlbum);
router.post("/save-photo", isVerify, savePhoto);
router.get("/get-photo-by-following", isVerify, getPhotoByFollowing);
router.get("/photo/", uploadPhotoMulter, getPhotoById);
router.get("/all-photos", uploadPhotoMulter, getAllPhoto);
router.delete("/remove-photo", isVerify, removePhoto);
router.get("/search", isVerify, searchPhoto);
router.get("/list-search", isVerify, getListSearch);




module.exports = router;