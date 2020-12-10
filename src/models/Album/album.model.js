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
    getAlbumsModel(email, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.find({ email: email }).toArray((err, result) => {
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
    }
}