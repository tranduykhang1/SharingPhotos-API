const express = require("express");
const router = express.Router();

const { postComment, getCommentByPhoto, removeComment } = require('../../controller/Comment/comment.controller')

const { isVerify } = require("../../middleware/verifyToken.js");

router.post('/comment', isVerify, postComment)
router.get('/comment/', getCommentByPhoto)
router.delete('/comment/', isVerify, removeComment)






module.exports = router;