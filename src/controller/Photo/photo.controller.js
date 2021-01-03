const { cloudinaryUpload } = require("../../config/cloudinary.config");
const {
    uploadPhotoModel,
    getPhotoByFollowingModel,
    getPhotoModel,
    removePhotoModel,
    searchPhotoModel,
    getAllPhotoModel,
    getPhotoByIdModel,
    savePhotoModel,
    getListSearch
} = require("../../models/Photo/photo.model");
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
            reaction: [],
            type: 'upload'
        };

        uploadPhotoModel(photosSchema, (err, result) => {
            if (err) return res.json("Err: " + err);
            return res.status(200).json("Upload Photo Success!");
        });
    },
    savePhoto(req, res) {
        let { album } = req.body, { url } = req.body, { desc } = req.body, { title } = req.body, user = req.user._id
        let titleRegex = regexStr(title)
        const photosSchema = {
            album: album,
            user: user,
            title: title,
            title_regex: titleRegex,
            desc: desc,
            url: url,
            type: 'save'
        };
        savePhotoModel(photosSchema, (err, result) => {
            if (err) return res.json(err)
            return res.json('Photo saved')
        })
    },
    getPhotoById(req, res) {
        const { id } = req.query
        getPhotoByIdModel(id, (err, result) => {
            return res.status(200).json(result);
        })
    },
    getPhotoByFollowing(req, res) {
        const { _id } = req.user
        getPhotoByFollowingModel(_id, (err, result) => {
            return res.status(200).json(result);
        })
    },
    getAllPhoto(req, res) {
        getAllPhotoModel((err, result) => {
            return res.status(200).json(result);

        })
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
        const { _id } = req.user
        let search = regexStr(q)
        searchPhotoModel(search, _id, (err, result) => {
            if (err) {
                return res.json(err)
            }
            return res.status(200).json(result);
        })

    },
    getListSearch(req, res) {
        const { _id } = req.user
        getListSearch(_id, (err, result) => {
            return res.status(200).json(result)
        })
    }

}