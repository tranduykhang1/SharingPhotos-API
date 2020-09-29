const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const bcrypt = require("bcrypt");
const db = require("../../DB/DB.js");

exports.register = async (req, res) => {
  let password = req.body.password;

  const hashPassword = await bcrypt.hash(password, 10);

  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashPassword,
    confirm_password: hashPassword
  };
  db.then(conn => {
    const userdb = conn.collection("user");
    userdb.findOne({ email: req.body.email }, (err, rs) => {
      if (rs) {
        return res.json("Email is exist");
      } else {
        userdb.insertOne(user, (err, rs) => {
          if (err) {
            res.send(err);
            return;
          }
          res.json("Success");
        });
      }
    });
  }).catch(err => {
    return err;
  });
};

exports.login = (req, res) => {
  let email = req.body.email,
    password = req.body.password;
  db.then(conn => {
    conn.collection("user").findOne({ email: email }, (err, user) => {
      if (!user) {
        res.json("Wrong username");
      } else {
        bcrypt.compare(password, user.password, (err, isHash) => {
          if (isHash) {
            let token = jwt.sign(user, config.jwtSecret, {
              expiresIn: 1 * 900
            });
            res.status(200).json(token);
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
exports.updatePassword = async (req, res) => {
  let newPassword = req.body.new_password;

  const hashPassword = await bcrypt.hash(newPassword, 10);
  db.then(conn => {
    conn.collection("user").updateOne(
      { email: req.user.email },
      {
        $set: {
          password: hashPassword,
          confirm_password: hashPassword
        }
      },
      (err, rs) => {
        if (err) {
          res.json(err);
        }
        if (rs) {
          res.json("Password upadated");
        }
      }
    );
  });
};
