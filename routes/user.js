

const express = require('express');
const router = express.Router();
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');



//Login page route
router.get("/signup",(req, res) => {
    res.render("user/signup.ejs");

});

router.post("/signup", wrapAsync(async(req, res) => {
    try{
    let {username , email, password} = req.body;
    const  newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to VK Portfolio!');
            res.redirect('/');
        });
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}));



router.get('/login', (req,res) => {
    res.render("user/login.ejs")
})

router.post("/login", passport.authenticate("local" , {failureRedirect: '/login', failureFlash: true}), 
async(req,res, next)=>{
    req.flash("success","Welcome back to VK Portfolio!");
   res.redirect("/");
});

router.get('/logout', (req,res) => {
    req.logout((err) => {
        if(err){
          return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/");
    })
})

module.exports = router;

