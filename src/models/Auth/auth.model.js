const jwt = require("jsonwebtoken");
const env = require("../../env/auth.env.js");
const db = require("../../DB/DB.js");

const { sendEmail } = require("../../models/Auth/handleMailer");


exports.registerModel = async(first_name, last_name, email, password, cb) => {
    db.then(conn => {
        const userdb = conn.collection("users");
        userdb.findOne({ email: email }, (err, rs) => {
            if (rs) {
                return cb("Email exits");
            } else {
                sendEmail(email, false, (err, rs) => {
                    if (err) {
                        return cb(new Error("Err send Mail"));
                    }
                    return cb(null, "Check your email");
                });
            }
        });
    }).catch(err => {
        return cb(new Error("Register Err"));
    });
};

exports.getToken = user => {
    let token = jwt.sign(user, env.jwtSecret, {
        expiresIn: 3 * 900
    });
    return token
};