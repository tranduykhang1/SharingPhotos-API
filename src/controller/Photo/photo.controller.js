const { cloudinaryUpload } = require("../../config/cloudinary.config");
const { uploadPhotoModel } = require("../../models/Photo/photo.model");

module.exports = {
    async uploadPhoto(req, res) {
        const { path } = req.file;
        const { desc } = req.body;
        const { album } = req.body

        const upload = await cloudinaryUpload(path, "/photo");
        const photo = {
            url: upload.url,
            desc: desc
        }
        uploadPhotoModel(album, photo, (err, result) => {
            if (err) return res.json("Err: " + err);
            return res.status(200).json("Upload Photo Success!");
        });
    },
    removePhoto(req, res) {

    },
    searchPhoto(req, res) {

    }
}