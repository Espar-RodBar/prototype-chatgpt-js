const express = require('express')
const router = express.Router()
const chatGptController = require('../controllers/messages')

// @desc Login/landing page
// @route GET /

router.get('/', (request, response) => {
  response.render('messages.ejs')
  // response.render("login.ejs");
})

// @desc Asking to AI
// @route POST /
router.post('/', chatGptController.completion)

// @desc Dashboard
// @route GET /dashboard

module.exports = router
