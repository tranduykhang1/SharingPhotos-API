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
            let listObjectId = []
            const user = conn.collection('users');
            user.find({ _id: ObjectId(id) }).toArray().then(async result => {
                result[0].following.map(id => {
                    listObjectId.push(ObjectId(id))
                })
                return user.find({ _id: { $in: listObjectId } }).toArray().then(user => {
                    return cb(user);
                })
            })

        })
    },
    removeFollowModel(user_id, followId, cb) {

        db.then(conn => {
            const user = conn.collection('users');
            user.updateOne({ _id: ObjectId(user_id) }, { $pull: { following: followId } }).then(result => {
                return cb(null, result)
            })
        })
    }

}