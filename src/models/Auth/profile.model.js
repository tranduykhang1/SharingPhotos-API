const db = require("../../DB/DB");

module.exports = {
    getProfileModel(email, cb) {
        db.then(conn => {
            const userDb = conn.collection("users");
            userDb.findOne({ email: email }, (err, user) => {
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
    updateProfileModel(user, email, cb) {
        console.log(user, email);
        db.then(conn => {
            const userDb = conn.collection("users");
            userDb.updateOne({ email: email }, {
                    $set: {
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