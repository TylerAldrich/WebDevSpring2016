var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');

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

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app, passport, LocalStrategy);

app.listen(port, ipaddress);