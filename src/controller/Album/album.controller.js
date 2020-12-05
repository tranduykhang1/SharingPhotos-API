const { createAlbumModel, getAlbumsModel } = require('../../models/Album/album.model')

module.exports = {
    createAlbum(req, res) {
        const date = new Date();
        const fullDay = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

        const email = req.user.email
        const albumName = req.body.album_name
        const album = {
            email: email,
            albums: [
                {
                    name: albumName,
                    create_day: fullDay,
                    photo: []
                }
            ]
        }
        createAlbumModel(album, (err, result) =>{
            if(err) return res.json(err)
            return res.status(200).json("Created")
        })
    },
    getAlbums(req,res){
        const email = req.user.email
        getAlbumsModel(email, (err,result) =>{
            if(err) return res.json(err)
            return res.status(200).json(result)
        })
    },
    editAlbum(req,res) {

    },
    deleteAlbum(req,res){

    }
}
