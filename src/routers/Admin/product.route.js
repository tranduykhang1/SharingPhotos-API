let express = require('express')
let router = express.Router();
let multer = require('multer')

const productController = require('../../controller/Admin/product.controller.js')
const verify = require('../../controller/Auth/verifyToken.js')


var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		        cb(null, './../front_end/public/image')
		    
	},
	filename: function(req, file, cb) {
		        cb(null, file.originalname)
		    
	}
	
})
var upload = multer({ storage: storage  })

router.post('/create_product',verify.isVerify, upload.single('image'),  productController.createProduct) 


module.exports = router
