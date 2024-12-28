const express = require('express')
const app = express()
const port = 3000
const web = require("./routes/web")

//File and image upload
const fileUpload = require ("express-fileupload")
app.use(fileUpload({useTempFiles: true}))

const connectDb = require('./db/connectDb')
//Connect Db
connectDb()

//For geting the generated token from frontcontroller
const cookieparser = require ('cookie-parser')
app.use(cookieparser())

//For frontend HTML template
app.set('view engine', 'ejs')

// static files for HTML CSS and images
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');

//messages
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));
//Flash messages
app.use(flash());

//Route Loading from web.js
app.use('/', web)



// Creating Server through below code
app.listen(port, () => {
  console.log(`Server stated on localhost port ${port}`)
})