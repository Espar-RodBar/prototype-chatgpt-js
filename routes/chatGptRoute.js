const express = require("express");
const router = express.Router();
const chatGptController = require("../controllers/chatGptController");

//@desc Login/landing page
//@route GET /

router.get("/", (request, response) => {
    response.render("index.ejs");
    // response.render("login.ejs");
});

//@desc Asking to AI
//@route POST /
router.post("/", chatGptController.completion);

//@desc Dashboard
//@route GET /dashboard

router.get("/dashboard", (request, response) => {
    response.render("dashboard.ejs");
});

module.exports = router;
