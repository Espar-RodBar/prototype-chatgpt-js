const express = require("express");
const router = express.Router();

//@desc Login/landing page
//@route GET /

router.get("/", (request, response) => {
    response.render("login.ejs");
});

//@desc Dashboard
//@route GET /dashboard

router.get("/dashboard", (request, response) => {
    response.render("dashboard.ejs");
});

module.exports = router;
