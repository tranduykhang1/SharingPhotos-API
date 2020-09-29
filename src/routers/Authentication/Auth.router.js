let express = require('express')
let router = express.Router();

const authController = require('../../controller/Auth/auth.controller.js')
const verify = require('../../controller/Auth/verifyToken.js')


router.post('/login', authController.login) 
router.post('/register', authController.register )
router.put('/update_password', verify.isVerify, authController.updatePassword)
module.exports = router
