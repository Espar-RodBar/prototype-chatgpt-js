/* eslint-disable n/no-path-concat */
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/.env", debug: true });
const dotenv = require('dotenv').config({
  path: __dirname + '/config/.env',
  debug: true,
})

const openai = require('./config/chatGptConfig')
const connectDB = require('./config/database')

const express = require('express')
const morgan = require('morgan')
const chatGptRoute = require('./routes/messages')
const indexroute = require('./routes/index')

const ejs = require('ejs')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

connectDB()

// Passport config
require('./config/passport')(passport)

// mongoose  sesions
const mongoStore = new MongoStore({
  mongoUrl: process.env.MONGO_URI,
})

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })
)

// static folder
app.use(express.static('public'))

// View Engine
app.set('view engine', 'ejs')

// Routes
app.use('/messages', chatGptRoute)
app.use('/', indexroute)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))
