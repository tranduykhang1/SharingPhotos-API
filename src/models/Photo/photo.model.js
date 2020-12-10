const db = require('../../DB/DB')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    uploadPhotoModel(album, photo, cb) {
        db.then(conn => {
            const albumDb = conn.collection("albums");
            albumDb.updateOne({ _id: ObjectId(album) }, {
                    $push: {
                        photo: photo
                    }
                },
                (err, result) => {
                    return cb(err, result);
                }
            );
        });
    }
}