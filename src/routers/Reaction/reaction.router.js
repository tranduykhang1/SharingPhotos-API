const express = require("express");
const router = express.Router();


const { isVerify } = require("../../middleware/verifyToken.js");

const { react, countReact, getUserReact } = require('../../controller/Reaction/react.controller')

router.post('/react', isVerify, react)
router.get('/count-reaction', isVerify, countReact)
router.get('/list-user-react', isVerify, getUserReact)



module.exports = router;