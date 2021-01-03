const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../DB/DB.js");
const salt = 10;

const { sendEmail } = require("../../models/Auth/handleMailer");
const { registerModel } = require("../../models/Auth/auth.model");
const { getToken } = require('../../models/Auth/auth.model')
const userSchema = require("../../schemaModel/userSchema");

let user = {};

exports.register = async(req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword
    };
    registerModel(
        user.email,
        (err, rs) => {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json(rs);
            }
        }
    );
};

exports.confirmEmail = async(req, res) => {
    userSchema.first_name = user.first_name;
    userSchema.last_name = user.last_name;
    userSchema.email = user.email;
    userSchema.password = user.password;
    userSchema.method = "local"

    db.then(conn => {
        conn.collection("users").insertOne(userSchema, (err, rs) => {
            if (err) {
                res.send(err);
                return;
            }
            res.redirect('http://localhost:1999/login')
        });
    });
};

exports.login = (req, res) => {
    let email = req.body.email,
        password = req.body.password;
    db.then(conn => {
        conn.collection("users").findOne({ email: email }, (err, user) => {
            if (!user) {
                res.json("Wrong username");
            } else {
                bcrypt.compare(password, user.password, (err, isHash) => {
                    if (isHash) {
                        let token = getToken(user)
                        res.status(200).json(token)
                    } else {
                        res.json("Wrong password");
                    }
                });
            }
        });
    }).catch(err => {
        return err;
    });
};

exports.refreshToken = () => {};

var email = ""

exports.updatePassword = async(req, res) => {
    let newPassword = req.body.new_password;
    // let email;

    console.log("Email:" + email + newPassword)

    const hashPassword = await bcrypt.hash(newPassword, 10);
    db.then(conn => {
        conn.collection("users").updateOne({ email: email }, {
                $set: {
                    password: hashPassword
                }
            },
            (err, rs) => {
                if (err) {
                    res.json(err);
                }
                if (rs) {
                    res.json("Password updated");
                }
            }
        );
    });
};

exports.forgotPassword = (req, res) => {
    let { email } = req.body;
    db.then(conn => {
        conn.collection("users").findOne({ email: email }, (err, user) => {
            if (!user) {
                return res.json("Wrong email");
            } else {
                sendEmail(user.email, true, (err, rs) => {
                    if (err) {
                        return res.status(403).json(err);
                    }
                    res.status(200).json("Check email");
                });
            }
        });
    });
};

exports.forgotPasswordUpdate = (req, res) => {
    // res.status(200).json("Success!");
    email = req.user.email
    res.redirect('http://localhost:1999/update-password')
};