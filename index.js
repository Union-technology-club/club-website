var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var bodyParser = require('body-parser');
var google = require('googleapis');
//var nodemailer = require('nodemailer');
var https = require('https');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require('passport');
var gcal = require('google-calendar');
var gauth = require('./auth.json');

passport.use(new GoogleStrategy({
    clientID: config.consumer_key,
    clientSecret: config.consumer_secret,
    callbackURL: "http://localhost:3000/auth/callback",
    scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
  },
  function(accessToken, refreshToken, profile, done) {

    //google_calendar = new gcal.GoogleCalendar(accessToken);

    return done(null, profile);
  }
));
var google_calendar = new gcal.GoogleCalendar(accessToken);

google_calendar.calendarList.list(function(err, calendarList));

// Initialize our express application
var app = express();

// Register Handlebars partials location
hbsutils.registerPartials('./views/partials');
hbsutils.registerWatchedPartials('./views/partials');

// Set Handlebars as the engine for HTML and run it
app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

// Set server ip and port
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '0.0.0.0');

// Set root directory.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
));

var server = app.listen(app.get('port'), app.get('ip'), function() {
  var address = server.address();
  console.log('[ttc] app running on http://%s:%s', address.address, address.port);
});
