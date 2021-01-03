const db = require('../../DB/DB')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    uploadPhotoModel(photos, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.insertOne(photos, (err, result) => {
                return cb(err, result)
            })
        });
    },
    savePhotoModel(photos, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.insertOne(photos, (err, result) => {
                return cb(err, result)
            })
        });
    },
    getPhotoByFollowingModel(id, cb) {
        db.then(conn => {
            const user = conn.collection('users');

            user.aggregate([
                { "$match": { "_id": ObjectId(id) } },
                { '$unwind': '$following' },
                {
                    "$lookup": {
                        "from": "photos",
                        "localField": "following",
                        "foreignField": "user",
                        "as": "photos"
                    },
                },
                { '$unwind': '$photos' },
                { "$addFields": { "userId": { "$toObjectId": "$photos.user" } } },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "users"
                    },
                },
                {
                    "$project": {
                        "photos": 1,
                        'userId': "$users._id",
                        "first_name": "$users.first_name",
                        "last_name": "$users.last_name",
                        "avatar": '$users.avatar',
                    }
                },
            ]).toArray().then(async result => {
                return cb(null, result)
            })

        })
    },
    getAllPhotoModel(cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.aggregate([
                { '$match': { 'type': 'upload' } },
                { "$addFields": { 'userId': { "$toObjectId": "$user" } } },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "users"

                    }
                },
                {
                    "$project": { 'userId': 1, 'url': 1, "title": 1, 'type': 1, 'reaction': 1, "users._id": 1, "users.last_name": 1, "users.first_name": 1 }
                }
            ]).toArray((err, result) => {
                return cb(err, result)
            })
        });
    },
    getPhotoByIdModel(id, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.aggregate([
                { "$match": { '_id': ObjectId(id) } },
                { "$addFields": { 'userId': { "$toObjectId": "$user" } } },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "users"

                    }
                },
                {
                    "$project": { 'userId': 1, 'url': 1, "title": 1, 'desc': 1, 'reaction': 1, 'comments': 1, "users": 1 }
                }
            ]).toArray((err, result) => {
                return cb(err, result)
            })
        });
    },
    getPhotoModel(id, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");

            let data = []
            photo.aggregate([
                { $match: { 'album': id } },
                { "$addFields": { 'userId': { "$toObjectId": "$user" } } },
                {
                    "$lookup": {
                        "from": "users",
                        "localField": "userId",
                        "foreignField": "_id",
                        "as": "users"
                    }
                },
                {
                    "$project": { 'userId': 1, 'url': 1, "title": 1, 'desc': 1, 'reaction': 1, 'comments': 1, "users.first_name": 1, "users.last_name": 1 }
                }

            ]).toArray((err, result) => {
                if (result) {
                    return cb(null, result)
                }
            })
        });
    },
    updatePhoto() {

    },
    removePhotoModel(id, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.deleteOne({ _id: ObjectId(id) }, (err, result) => {
                return cb(err, result)
            })
        })
    },
    searchPhotoModel(q, id, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            const user = conn.collection("users");

            user.aggregate([{ $match: { _id: ObjectId(id) } }, { $match: { history_search: q } }, ]).toArray((err, result) => {
                if (!result) {
                    user.updateOne({ _id: ObjectId(id) }, { $push: { history_search: q } })
                }
            })
            photo.aggregate([
                { $match: { 'title_regex': { $regex: q }, 'type': 'upload' } },
                { "$addFields": { 'userId': { "$toObjectId": "$user" } } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users',
                    }
                },
                {
                    $project: { _id: 1, 'users.first_name': 1, 'users.last_name': 1, 'users._id': 1, title: 1, url: 1, reaction: 1 }
                }
            ]).toArray((err, result) => {
                return cb(err, result)
            })
        })
    },
    getListSearch(id, cb) {
        db.then(conn => {
            const user = conn.collection('users')
            user.aggregate([
                { $match: { _id: ObjectId(id) } },
                { $project: { 'history_search': 1, '_id': 1 } }
            ]).toArray((err, result) => {
                return cb(err, result)
            })
        })
    }
}