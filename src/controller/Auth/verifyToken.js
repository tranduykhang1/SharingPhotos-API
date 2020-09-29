const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");

exports.isVerify = (req, res, next) => {
	if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "JWT"
	) {
		const token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, config.jwtSecret, (err, user) => {
			if (err) return res.status(403).json('Unauthorized user');
			req.user = user;
			res.status(200)
			next();
			
		});
	}
	else{
		res.status(401).json("Unauthorized user")
	}
};
