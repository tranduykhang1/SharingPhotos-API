const {
    updateAvatarModel,
    updateProfileModel,
    updateHobbiesModel,
    getProfileModel
} = require("../../models/Auth/profile.model");
const { cloudinaryUpload } = require("../../config/cloudinary.config");

module.exports = {
    getProfile(req, res) {
        getProfileModel(req.user.email, (err, result) => {
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
    updateProfile(req, res) {
        updateProfileModel(req.body, req.user.email, (err, result) => {
            if (err) {
                return res.json("Update fail!");
            }
            return res.json("Update success!");
        });
    }
};