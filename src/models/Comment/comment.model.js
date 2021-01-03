const db = require("../../DB/DB.js");
const ObjectId = require('mongodb').ObjectID;


module.exports = {
    postCommentModel(comment, photoId, cb) {
        db.then(conn => {
            const photo = conn.collection('photos')
            photo.updateOne({ _id: ObjectId(photoId) }, { $push: { comments: comment } }).then(result => {
                return cb(null, result)
            }).catch(err => {
                return cb(err)
            })
        })
    },
    getCommentModel(id, cb) {
        db.then(conn => {
            const photo = conn.collection('photos')
            photo.aggregate([
                { "$match": { '_id': ObjectId(id) } },
                { '$unwind': '$comments' },
                { '$addFields': { 'userId': { '$toObjectId': '$comments.user' } } },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "users"
                    }
                },
                {
                    "$project": { 'userId': 1, 'comments': 1, "users._id": 1, "users.last_name": 1, "users.first_name": 1, "users.avatar": 1 }
                }
            ]).toArray().then(result => {
                return cb(null, result)
            }).catch(err => {
                return cb(err)
            })
        })
    },
    removeComment(cmt_id, photo_id, cb) {
        db.then(conn => {
            const photo = conn.collection('photos')
            photo.updateOne({ _id: ObjectId(photo_id) }, { $pull: { comments: { id: cmt_id } } }, (err, result) => {
                return cb(err, result)
            })
        })
    }
}