const experss = require("express");
const body = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require('cors')

const app = experss();

app.use(cors())
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ["key1", "key2"]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(body.urlencoded({ extended: false }));
app.use(body.json());


const auth = require("./src/routers/Auth/Auth.router.js");
const profile = require("./src/routers/Auth/profile.router.js");
const album = require('./src/routers/Album/album.router')
const photo = require('./src/routers/Photo/photo.router')
const follow = require('./src/routers/Follow/follow.router')
const comment = require('./src/routers/Comment/comment.router');
const reaction = require('./src/routers/Reaction/reaction.router');

app.use("/", auth);
app.use("/", profile);
app.use("/", album);
app.use('/', photo);
app.use('/', follow);
app.use('/', comment);
app.use('/', reaction);


app.listen(process.env.PORT || 9999);
