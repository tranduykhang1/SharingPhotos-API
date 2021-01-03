const jwt = require("jsonwebtoken");
const env = require("../../env/auth.env.js");
const db = require("../../DB/DB.js");

const { sendEmail } = require("../../models/Auth/handleMailer");


exports.registerModel = async(email, cb) => {
    console.log(email)
    db.then(conn => {
        const userDb = conn.collection("users");
        userDb.findOne({ email: email }, (err, rs) => {
            if (rs) {
                return cb("Email exits");
            } else {
                sendEmail(email, false, (err, rs) => {
                    if (rs) {
                        return cb(null, "Check your email");
                    }
                });
            }
        });
    }).catch(err => {
        return cb(new Error("Register Err"));
    });
};

exports.getToken = user => {
    let token = jwt.sign(user, env.jwtSecret, {
        expiresIn: 3 * 9000
    });
    return token
};