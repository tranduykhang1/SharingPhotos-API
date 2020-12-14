const { createAlbumModel, getAlbumsModel, editAlbumsModel, deleteAlbumsModel } = require('../../models/Album/album.model')

module.exports = {
    createAlbum(req, res) {
        const date = new Date();
        const fullDay = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

        const email = req.user.email
        const albumName = req.body.album_name
        const album = {
            email: email,
            name: albumName,
            create_day: fullDay
        }
        createAlbumModel(album, (err, result) => {
            if (err) return res.json(err)
            return res.status(200).json("Created")
        })
    },
    getAlbums(req, res) {
        const email = req.user.email
        getAlbumsModel(email, (err, result) => {
            if (err) return res.json(err)
            return res.status(200).json(result)
        })
    },
    editAlbum(req, res) {
        let { id } = req.body;
        let { new_name } = req.body
        editAlbumsModel(id, new_name, (err, result) => {
            if (err) return res.json(err)
            return res.status(200).json("Update success!");
        })
    },
    deleteAlbum(req, res) {
        let { id } = req.query;
        deleteAlbumsModel(id, (err, result) => {
            if (err) return res.json("Something went wrong")
            return res.json("Delete success!");
        })
    }
}