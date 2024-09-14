

const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const User = require('../models/user.js');
const {isLoggedIn} = require('../middleware.js');



//Home page route
router.get("/", wrapAsync(async(req, res) => {
    res.render("index.ejs");
}));

//work page route
router.get("/work",isLoggedIn, async(req, res) => {
    res.render("work.ejs");
});

//redirect
// router.get('/redirect-home', wrapAsync(async(req, res) => {
//     res.redirect('/');
// }));

//My skill page route
router.get("/services",isLoggedIn,wrapAsync(async(req, res) => {
    res.render("servi.ejs");
}));

//Contact page route
router.get("/contact", isLoggedIn,wrapAsync(async (req, res) => {
    res.render("contact.ejs");
}));

module.exports = router;

