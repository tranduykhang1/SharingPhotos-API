const db = require('../../DB/DB')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    createAlbumModel(album, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.insertOne(album, (err, result) => {
                return cb(err, result)
            })
        })
    },
    getAlbumsModel(id, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.aggregate([
                { $match: { user: id } },
                { $addFields: { "photoId": { "$toString": "$_id" } } },
                {
                    $lookup: {
                        from: 'photos',
                        localField: 'photoId',
                        foreignField: 'album',
                        as: 'photos'
                    },
                }, { $project: { '_id': 1, 'name': 1, 'photos.url': 1, } }
            ]).toArray((err, result) => {
                return cb(err, result)
            })
        })
    },
    editAlbumsModel(id, newName, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.updateOne({ _id: ObjectId(id) }, { $set: { "name": newName } }, (err, result) => {
                return cb(err, result)
            })
        })
    },
    deleteAlbumsModel(id, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.deleteOne({ _id: ObjectId(id) }, (err, result) => {
                return cb(err, result)
            })
        })
    },
    getAlbumByUserModel(id, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.aggregate([
                { $match: { user: id } },
                { $addFields: { "albumId": { "$toString": "$_id" } } },
                {
                    $lookup: {
                        from: 'photos',
                        localField: 'albumId',
                        foreignField: 'album',
                        as: 'photos'
                    },
                },
                { $project: { '_id': 1, 'name': 1, 'photos.url': 1, } }
            ]).toArray((err, result) => {
                return cb(err, result)
            })
        })
    },
    getAlbumByIdModel(id, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.findOne({ _id: ObjectId(id) }, (err, result) => {
                return cb(err, result)
            })
        })
    }
}