if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
app.use(express.static('views'));
const engine = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const flash = require('connect-flash');



const homeRoutes = require('./routes/home.js');
const userRoutes = require('./routes/user.js');


app.use(express.urlencoded({ extended: true }));



let port = process.env.PORT;


const MONGO_URL= "mongodb://127.0.0.1:27017/PortfolioVK";
main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log( err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


// Set 'ejs-mate' as the rendering engine for EJS
app.engine('ejs' , engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


// session options
const sessionOptions = {
    secret: "process.env.SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// Passport setup

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use flash messages in your routes
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});



app.use('/', homeRoutes);
app.use('/', userRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//Error handling middleware
app.use((err , req, res, next) => {
    let {StatusCode = 500, message = 'Something went wrong!'} = err;
    res.status(StatusCode).render('error.ejs', {message});
});

app.listen(port ,() =>{
    console.log(`app listening on port ${port}`);
});


