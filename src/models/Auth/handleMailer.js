const nodemailer = require("nodemailer"),
    jwt = require("jsonwebtoken"),
    { jwtSecret } = require("../../env/auth.env.js");

const btnConfirmStyle = `
    text-align: center;
    position: absolute;
    color: #ffffff;
    width: 240px;
    background-color: #ffa705;
    border-radius: 4px;
    margin-left: -5px;
    top: 180px;
    padding: 10px;
    text-decoration: none;
    font-size: 20;
`;
const divStyle = `
    margin: auto;
    width: 250px;
    height: 180px;
    margin-top: 10px;
    border-radius: 4px;
    padding: 20px;
    box-shadow: -1px 2px 7px 1px #cecece;
`;

const urlRegister = "http://localhost:9999/confirm-email/?token=";
const urlForgotPassword = "http://localhost:9999/forgot-password-confirm/?token=";

const templateForgotPassword = (divStyle, style, mailToken) => {
    return (
        "<div style='" +
        divStyle +
        "'> <h3 style='text-align:center'>Xac nhan Email de cap nhat mat khau moi</h3><a href='" +
        urlForgotPassword +
        mailToken +
        "' style='" +
        style +
        "'>Xac Nhan</a></div>"
    );
};

const templateRegister = (divStyle, style, mailToken) => {
    return (
        "<div style='" +
        divStyle +
        "'> <h3 style='text-align:center'>Xac nhan Email</h3><a href='" +
        urlRegister +
        mailToken +
        "' style='" +
        style +
        "'>Xac Nhan</a></div>"
    );
};

const generateToken = email => {
    let mailToken = jwt.sign({ email }, jwtSecret, {
        expiresIn: "5m"
    });
    return mailToken;
};

exports.sendEmail = (email, isForgot, cb) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sep31700215@gmail.com",
            pass: "photosharing2"
        }
    });
    if (isForgot) {
        var mailOptions = {
            from: "sep31700215@gmail.com",
            subject: "Cập nhật mật khẩu",
            to: email,
            html: templateForgotPassword(
                divStyle,
                btnConfirmStyle,
                generateToken(email)
            )
        };
    } else {
        var mailOptions = {
            from: "sep31700215@gmail.com",
            subject: "Xác nhận Email",
            to: email,
            html: templateRegister(divStyle, btnConfirmStyle, generateToken(email))
        };
    }
    transporter.sendMail(mailOptions, (err, rs) => {
        if (rs) {
            console.log('oke')
            return cb(null, rs);
        }
        console.log(err)
        return cb(err, null);

    });
};