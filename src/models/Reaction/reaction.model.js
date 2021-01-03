const db = require('../../DB/DB')
const ObjectId = require('mongodb').ObjectID;


module.exports = {
    reactModel(userId, photoId, cb) {

        db.then(conn => {
            const photo = conn.collection('photos');
            photo.findOne({ _id: ObjectId(photoId), reaction: userId }).then(result => {
                if (!result) {
                    photo.updateOne({ _id: ObjectId(photoId) }, { $push: { reaction: userId } }, (err, result) => {
                        return cb(err, "Like")
                    })
                } else {
                    photo.updateOne({ _id: ObjectId(photoId) }, { $pull: { reaction: userId } }, (err, result) => {
                        return cb(err, "Unlike")
                    })
                }
            })

        })
    },
    countReactModel(photoId, cb) {
        db.then(conn => {
            const photo = conn.collection('photos');
            photo.findOne({ _id: ObjectId(photoId) }, (err, result) => {
                return cb(err, result)
            })

        })
    },
    getListUserModel(photoId, cb) {
        db.then(conn => {
            const photo = conn.collection('photos');
            const user = conn.collection('users');

            photo.aggregate([{ $match: { _id: ObjectId(photoId) } }]).toArray(async(err, result) => {
                let idArray = []
                await result[0].reaction.map(id => {
                    idArray.push(ObjectId(id.id))
                })
                return user.find({ _id: { $in: idArray } }).toArray((err, result) => {
                    return cb(err, result)
                })
            })
        })
    },

}