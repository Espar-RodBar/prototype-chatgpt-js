const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/index')

// router.get('/', (request, response) => {
//   response.render('index.ejs')
// })

// router.get('/login', (request, response) => {
//   response.render('login.ejs')
// })

// router.get('/signup', (request, response) => {
//   response.render('signup.ejs')
// })

router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router