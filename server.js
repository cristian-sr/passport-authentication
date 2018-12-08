// SERVER

// SETUP 
// GET ALL TOOLS THAT WE NEED
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var configDB = require('./config/database.js');


// CONFIGURATION

mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// SET UP OUR EXPRESS APPLICATION
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information form html forms
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs'); // set up ejs for templating


// REQUIRED FOR PASSPORT
app.use(session({
    secret: 'ilovecodingcodigncoding', // session secret
    resave: true,
    saveUnitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect - flash for flash message stored in session


// ROUTES
require('./approutes.js')(app, passport); // loadr our routes and apps in our app

// LAUNCH
app.listen(port);
console.log('The magic happens on port ' + port);