const { cloudinaryUpload } = require("../../config/cloudinary.config");
const { uploadPhotoModel, getPhotoModel, removePhotoModel, searchPhotoModel } = require("../../models/Photo/photo.model");
const { regexStr } = require("../../config/regex.config");

// const { v4: uuidv4 } = require('uuid');

// uuidv4()

module.exports = {
    async uploadPhoto(req, res) {
        const { path } = req.file;
        const { desc } = req.body;
        const { album } = req.body
        const { title } = req.body;
        const user = req.user._id;

        let titleRegex = regexStr(title)

        const upload = await cloudinaryUpload(path, "/photo");

        const photosSchema = {
            album: album,
            user: user,
            title: title,
            title_regex: titleRegex,
            desc: desc,
            url: upload.url,
            comments: [],
            reaction: []
        };

        uploadPhotoModel(photosSchema, (err, result) => {
            if (err) return res.json("Err: " + err);
            return res.status(200).json("Upload Photo Success!");
        });
    },
    getPhotoByAlbum(req, res) {
        const { id } = req.query
        getPhotoModel(id, (err, result) => {
            res.json(result);
        })
    },

    removePhoto(req, res) {
        const { id } = req.query;
        removePhotoModel(id, (err, result) => {
            res.json("Photo removed");
        })
    },
    searchPhoto(req, res) {
        const { q } = req.query
        searchPhotoModel(q, (err, result) => {
            if (err) {
                return res.json(err)
            }
            return res.status(200).json(result);
        })

    }
}