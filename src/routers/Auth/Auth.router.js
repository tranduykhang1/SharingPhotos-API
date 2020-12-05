const express = require("express");
const passport = require("passport");
const router = express.Router();

const authController = require("../../controller/Auth/auth.controller.js");
const { getToken } = require('../../models/Auth/auth.model')


const {
	passportAuth
} = require("../../controller/Auth/google_facebook_api.controller");
const {
	isVerify,
	isVerifyMailToken
} = require("../../middleware/verifyToken.js");
const { googleLogin } = require('../../controller/Auth/google_facebook_api.controller')


router.post("/login", authController.login);


router.post('/login/google', googleLogin)
/*
router.get(
	"/login/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		let token = getToken(req.user)
		res.status(200).json(token);
	}
);
router.get("/success", (req, res) => {
	res.send("oke");
});
*/
router.post("/register", authController.register);
router.put("/update-password", isVerify, authController.updatePassword);
router.get("/confirm-email/", isVerify, authController.confirmEmail);

router.post("/forgot-password", authController.forgotPassword);
router.get("/forgot-password-confirm", authController.forgotPasswordUpdate);

module.exports = router;
