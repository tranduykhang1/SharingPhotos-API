const multer = require('multer')
const upload = multer({ dest: './src/upload/' })


module.exports.uploadPhotoMulter = upload.single('photo')