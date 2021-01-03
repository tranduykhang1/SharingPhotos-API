const { reactModel, countReactModel, getListUserModel } = require('../../models/Reaction/reaction.model')


module.exports = {
    react(req, res) {
        const userId = req.user._id
        const { photo_id } = req.body
        const reaction = {
            id: userId,
        }
        reactModel(reaction, photo_id, (err, result) => {
            if (err) return res.json(err)
            return res.status(200).json(result)
        })
    },
    countReact(req, res) {
        const { photo_id } = req.query;

        countReactModel(photo_id, (err, result) => {
            res.json(result.reaction.length)
        })
    },
    getUserReact(req, res) {
        const { photo_id } = req.query;
        getListUserModel(photo_id, (err, result) => {
            res.status(200).json(result)
        })
    }
}