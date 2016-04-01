var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');

var mongoose = require('mongoose');

// default connection string for local dev
var connectionString = "mongodb://127.0.0.1:27017:tylerrules";

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var passport_secret = process.env.PASSPORT_SECRET || 'blah';

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: passport_secret }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, passport, LocalStrategy, mongoose, db);

app.listen(port, ipaddress);