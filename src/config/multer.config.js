const multer = require('multer')
const upload = multer({dest: './src/upload/'})


module.exports.uploadAvatar = upload.single('avatar')  
