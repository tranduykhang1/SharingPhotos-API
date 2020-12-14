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
    getPhotoModel(id, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.find({ album: id }).toArray((err, result) => {
                return cb(err, result)
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
    searchPhotoModel(q, cb) {
        db.then(conn => {
            const photo = conn.collection("photos");
            photo.find({ title_regex: { $regex: q } }).toArray((err, result) => {
                return cb(err, result)
            })
        })
    }
}