const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../env/auth.env.js");

exports.isVerify = (req, res, next) => {
    const { token } = req.query;
    if (token) {
        jwt.verify(token, jwtSecret, (err, result) => {
            if (err) return res.status(403).json("Verify fail! Token invalid");
            else {
                req.user = result
                return next();
            }
        });
        return
    }
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) return res.status(403).json("Unauthorized user");
            req.user = user;
            res.status(200);
            next();
        });
    } else {
        res.status(401).json("Unauthorized user");
    }
};

exports.isVerifyMailToken = (req, res, next) => {
    let { token } = req.query;
    jwt.verify(token, jwtSecret, (err, result) => {
        if (err) return res.status(403).json("Verify fail! Token invalid");
        req.session.email = result.email;
        next();
    });
};