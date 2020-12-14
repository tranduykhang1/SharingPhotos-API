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
        const { current_user } = req.body;
        const { follow_user } = req.body;

        followUserModel(current_user, follow_user, (err, result) => {
            if (err) return res.json(err)
            res.status(200).json("Following this user!");
        })

    },
    removeFollow(req, res) {
        const { follow_id } = req.query;
        const user_id = req.user._id
        console.log(user_id, follow_id)
        removeFollowModel(user_id, follow_id, (err, result) => {
            if (result) {
                return res.status(200).json("Remove success");
            }
        })
    }
}