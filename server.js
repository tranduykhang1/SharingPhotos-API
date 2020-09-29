const experss = require('express');
const body = require('body-parser')

const app = experss();

app.use(body.urlencoded({ extended: false  }))
app.use(body.json())


const isVerify = require('./src/controller/Auth/verifyToken.js');
app.get('/welcome', isVerify.isVerify, (req, res) => {
	res.send("Welcome to my project")
})

const auth = require('./src/routers/Authentication/Auth.router.js');
const admin = require('./src/routers/Admin/product.route.js')

app.use('/', auth)
app.use('/', admin)
app.listen(process.env.PORT || 9999);
