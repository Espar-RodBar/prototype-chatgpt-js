/* eslint-disable n/no-path-concat */
const express = require('express')
const app = express()

require('dotenv').config({
  path: './config/.env',
})

// mongoose
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const cors = require('cors')
const flash = require('express-flash')
const morgan = require('morgan')
const connectDB = require('./config/database')
const indexroute = require('./routes/index')
const chatGptRoute = require('./routes/messages')

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(flash())

const openai = require('./config/chatGptConfig')

// mongoose  sesions
const mongoStore = new MongoStore({
  // mongoUrl: process.env.MONGO_URI,
  mongooseConnection: mongoose.connection,
})

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })
)

// Passport config
require('./config/passport')(passport)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/messages', chatGptRoute)
app.use('/', indexroute)

const PORT = process.env.PORT || 3005
app.listen(PORT, () => console.log(`Server runnig on port ${PORT}`))
