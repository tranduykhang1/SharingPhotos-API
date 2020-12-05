const db = require('../../DB/DB')

module.exports = {
    createAlbumModel(album, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.insertOne(album, (err,result) =>{
                return cb(err,result)
            })
        })
    },
    getAlbumsModel(email, cb) {
        db.then(conn => {
            const albumDb = conn.collection('albums')
            albumDb.findOne({email: email}, (err,result) =>{
                return cb(err,result)
            })
        })
    }
}
