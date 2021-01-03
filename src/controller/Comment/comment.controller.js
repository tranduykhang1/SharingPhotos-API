const { postCommentModel, getCommentModel, removeComment} = require("../../models/Comment/comment.model");
const { v4: uuidv4 } = require('uuid');

uuidv4()


module.exports = {
    postComment(req, res) {
        const { user_id } = req.body;
        const { photo_id } = req.body;
        const { content } = req.body;

        const comment = {
            id: uuidv4(), 
            user: user_id,
            content: content
        }

        postCommentModel(comment, photo_id, (err, result) => {
            if(err) return res.json(err)
            return res.status(200).json("Comment posted")
        })

    },
    getCommentByPhoto(req,res){
        const {id} = req.query
        getCommentModel(id, (err,result) =>{
            if(err) return res.json(err)
            return res.status(200).json(result)
        })
    },
    removeComment(req,res){
        const {comment_id} = req.query
        const {photo_id} = req.query

        removeComment(comment_id, photo_id, (err,result) =>{
            if(err) return res.json(err)
            return res.status(200).json("Comment removed")
        })
    }


}




