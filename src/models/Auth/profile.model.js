const { ObjectId } = require("mongodb");
const db = require("../../DB/DB");

module.exports = {
    getProfileModel(id, cb) {
        db.then(conn => {
            const userDb = conn.collection("users");
            userDb.findOne({ _id: ObjectId(id) }, (err, user) => {
                return cb(err, user);
            });
        });
    },
    updateAvatarModel(email, avatar, cb) {
        db.then(conn => {
            const userDb = conn.collection("users");
            userDb.updateOne({ email: email }, {
                    $set: {
                        avatar: avatar
                    }
                },
                (err, result) => {
                    return cb(err, result);
                }
            );
        });
    },
    updateHobbiesModel(hobbies, email, cb) {
        db.then(conn => {
            const userDb = conn.collection("users");
            userDb.updateOne({ email: email }, {
                    $set: {
                        hobbies: hobbies
                    }
                },
                (err, result) => {
                    return cb(err, result);
                }
            );
        });
    },
    updateProfileModel(user, avatar, email, cb) {
        db.then(conn => {
            const userDb = conn.collection("users");
            let avt
            if (avatar) {
                avt = avatar
            } else {
                avt = user.photo
            }
            userDb.updateOne({ email: email }, {
                    $set: {
                        avatar: avt,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        user_name: user.user_name,
                        gender: user.gender,
                        bio: user.bio,
                        location: user.location
                    }
                },
                (err, result) => {
                    return cb(err, result);
                }
            );
        });
    }
};