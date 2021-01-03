const { followUserModel, listFollowModel, removeFollowModel } = require("../../models/Follow/follow.model");

module.exports = {
    listFollow(req, res) {
        const id = req.user._id;
        listFollowModel(id, (err, result) => {
            if (err) return res.json(err)
            res.status(200).json(result);
        })

    },
    followUser(req, res) {
        const { _id } = req.user
        const { follow_user } = req.body;

        followUserModel(_id, follow_user, (err, result) => {
            if (err) return res.json(err)
            res.status(200).json("Following this user!");
        })

    },
    removeFollow(req, res) {
        const { follow_id } = req.query;
        const { _id } = req.user
        removeFollowModel(_id, follow_id, (err, result) => {
            if (result) {
                return res.status(200).json("Remove success");
            }
        })
    }
}