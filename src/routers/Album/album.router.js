const express = require("express");
const router = express.Router();

const { isVerify } = require('../../middleware/verifyToken')
const { createAlbum, getAlbums, getAlbumById, editAlbum, deleteAlbum, getAlbumByUser } = require('../../controller/Album/album.controller')

router.post('/create-album', isVerify, createAlbum)
router.get('/get-album', isVerify, getAlbums)
router.get('/get-album-id/', isVerify, getAlbumById)
router.get('/album-by-user/', isVerify, getAlbumByUser)
router.put('/edit-album', isVerify, editAlbum)
router.delete('/delete-album/', isVerify, deleteAlbum)


module.exports = router;