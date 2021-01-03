const {
    createAlbumModel,
    getAlbumsModel,
    editAlbumsModel,
    deleteAlbumsModel,
    getAlbumByUserModel,
    getAlbumByIdModel
} = require('../../models/Album/album.model')

module.exports = {
    createAlbum(req, res) {
        const date = new Date();
        const fullDay = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

        const user = req.user._id
        const albumName = req.body.album_name
        const album = {
            user: user,
            name: albumName,
            create_day: fullDay
        }
        createAlbumModel(album, (err, result) => {
            if (err) return res.json(err)
            return res.status(200).json("Created")
        })
    },
    getAlbums(req, res) {
        const { _id } = req.user
        getAlbumsModel(_id, (err, result) => {
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
    },
    getAlbumByUser(req, res) {
        let { id } = req.query;

        getAlbumByUserModel(id, (err, result) => {
            return res.status(200).json(result);
        })
    },
    getAlbumById(req, res) {
        let { id } = req.query;
        getAlbumByIdModel(id, (err, result) => {
            return res.status(200).json(result);
        })
    },

}