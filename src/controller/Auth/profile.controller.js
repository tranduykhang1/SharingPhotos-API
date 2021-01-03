const {
    updateAvatarModel,
    updateProfileModel,
    updateHobbiesModel,
    getProfileModel
} = require("../../models/Auth/profile.model");
const { cloudinaryUpload } = require("../../config/cloudinary.config");

module.exports = {
    async getProfile(req, res) {
        let { _id } = req.user
        getProfileModel(_id, (err, result) => {
            if (err) {
                return res.json("Get profile fail");
            }
            return res.status(200).json(result);
        });
    },
    getUserById(req, res) {
        const { id } = req.query
        console.log(id)
        getProfileModel(id, (err, result) => {
            if (err) {
                return res.json("Get profile fail");
            }
            return res.status(200).json(result);
        });
    },
    async updateAvatar(req, res) {
        const path = req.file.path;
        const upload = await cloudinaryUpload(path, "/avatar");
        updateAvatarModel(req.user.email, upload.url, (err, result) => {
            if (err) return res.json("Err: " + err);
            return res.status(200).json("Avatar upload success!");
        });
    },
    updateHobbies(req, res) {
        let { hobbies } = req.body
        updateHobbiesModel(hobbies, req.user.email, (err, result) => {
            if (err) return res.json("Update fail1")
            res.status(200).json("Update success!")
        })
    },
    async updateProfile(req, res) {
        let url;
        if (req.file) {
            const path = req.file.path;
            const upload = await cloudinaryUpload(path, "/avatar");
            url = upload.url
        } else {
            url = req.body.photo
        }

        updateProfileModel(req.body, url, req.user.email, (err, result) => {
            if (err) {
                return res.json("Update fail!");
            }
            return res.json("Update success!");
        });
    }
};