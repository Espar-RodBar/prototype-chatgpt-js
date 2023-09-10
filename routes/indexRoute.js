const express = require('express')
const router = express.Router()
// const indexController = require('../controllers/indexController')

router.get('/', (request, response) => {
  response.render('index.ejs')
  // response.render("login.ejs");
})

module.exports = router
