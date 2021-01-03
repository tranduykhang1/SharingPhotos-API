const db = require('../../DB/DB')
const ObjectId = require('mongodb').ObjectID;

// const { getListUser } = require('../../models/User/user.model')

module.exports = {
    followUserModel(currentUser, followUser, cb) {
        db.then(conn => {
            const user = conn.collection("users");
            user.updateOne({ _id: ObjectId(currentUser) }, { $push: { following: followUser } }, (err, result) => {
                if (result) {
                    user.updateOne({ _id: ObjectId(followUser) }, { $push: { followers: currentUser } }, (err, result) => {
                        return cb(err, result);
                    })
                }
            })
        });
    },
    listFollowModel(id, cb) {
        db.then(conn => {
            const user = conn.collection('users');
            user.aggregate([
                { "$match": { "_id": ObjectId(id) } },
                { '$unwind': '$following' },
                { "$addFields": { 'userId': { "$toObjectId": "$following" } } }, {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "users"
                    }
                },
                {
                    "$project": { "users._id": 1, "users.avatar": 1, "users.last_name": 1 }
                }
            ]).toArray().then(result => cb(result)).catch(err => cb(err))

        })
    },
    removeFollowModel(user_id, followId, cb) {

        db.then(conn => {
            const user = conn.collection('users');
            user.updateOne({ _id: ObjectId(user_id) }, { $pull: { following: followId } }).then(result => {
                user.updateOne({ _id: ObjectId(followId) }, { $pull: { followers: user_id } })
                    .then(result => {
                        if (result) {
                            return cb(null, result)
                        }
                    })
            })
        })
    }

}