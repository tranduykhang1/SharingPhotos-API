const db = require('../../DB/DB')
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    async getListUser(users, cb) {
        let listUser = [];
        db.then(conn => {
            const user = conn.collection('users');
            users.following.map(id => {
                user.findOne({ _id: ObjectId(id) }).then(user => {
                    listUser.push(user);
                })
            })
            return cb(listUser)
        })
    }

}