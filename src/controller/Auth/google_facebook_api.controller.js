//const GoogleStrategy = require("passport-google-oauth20").Strategy;
//const passport = require("passport");
//const { registerModel } = require("../../models/Auth/auth.model");
const db = require("../../DB/DB");
const userSchema = require("../../schemaModel/userSchema");
const { getToken } = require("../../models/auth/auth.model")

const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = '183749103002-l64itvh82djkou6tfq1cq1qdvp526vr2.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

exports.googleLogin = async(req, res) => {
    const { tokenId } = req.body;
    await client
        .verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID
        })
        .then(response => {
            const userData = response.payload
            db.then(conn => {
                conn
                    .collection("users")
                    .findOne({ email: userData.email }, (err, user) => {
                        if (user) {
                            const token = getToken(user)
                            res.status(200).json(token)
                        } else {
                            userSchema.first_name = userData.given_name;
                            userSchema.last_name = userData.family_name;
                            userSchema.email = userData.email;
                            userSchema.avatar = userData.picture
                            userSchema.method = "google"
                            db.then(conn => {
                                conn.collection("users").insertOne(userSchema, (err, result) => {
                                    const token = getToken(user)
                                    res.status(200).json(token)
                                });
                            });
                        }
                    });
            });
        })
        .catch(err => {
            res.json(err)
        })
};

/*
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID:
        "183749103002-l64itvh82djkou6tfq1cq1qdvp526vr2.apps.googleusercontent.com",
      clientSecret: "95Kzv9KzYckXWvJBWlk0KYPB",
      callbackURL: "/google/callback"
    },
    async (accesToken, refreshToken, profile, done) => {
      console.log(profile);
      userSchema.googleId = profile.id;
      userSchema.first_name = profile._json.given_name;
      userSchema.last_name = profile._json.family_name;
      userSchema.email = profile._json.email;
      userSchema.avatar = profile._json.picture
      userSchema.method = "google"

      db.then(conn => {
        conn
          .collection("users")
          .findOne({ googleId: profile.id }, (err, res) => {
            if (res) {
              return done(null, res);
            } else {
              db.then(conn => {
                conn.collection("users").insertOne(userSchema, (err, rs) => {
                  return done(err, rs.ops[0]);
                });
              });
            }
          });
      });
    }
  )
);
*/