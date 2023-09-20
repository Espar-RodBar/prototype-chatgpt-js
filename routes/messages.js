const express = require('express')
const router = express.Router()

const chatGptController = require('../controllers/messages')
const { ensureAuth } = require('../middleware/auth')

// @desc Login/landing page
// @route GET /
router.get('/', ensureAuth, chatGptController.messages)

// @desc Asking to AI
// @route POST /
router.post('/', chatGptController.completion)

module.exports = router
