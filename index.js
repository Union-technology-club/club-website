var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var bodyParser = require('body-parser');
var google = require('googleapis');
//var nodemailer = require('nodemailer');
var https = require('https');

//var OAuth2 = google.auth.OAuth2;
//var oauth2Client = new OAuth2(
//var gmailauth = require('./auth.js');

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
}));
/*
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: gmailauth
});
*/
//google.

/*
var mailOptions = {
    from: 'Union TTC <uctechtabletop@gmail.com>',
    to: 'uctechtabletop@gmail.com, keawade@gmail.com',
    subject: 'Feedback from website'
};
*/

var eventList = https.request('https://www.googleapis.com/calendar/v3/calendars/5ud4dbia1ql8tpcqjeep9fd77k@group.calendar.google.com/events?key=AIzaSyDidlQlkYbB_LnljWn7T8YEzlyqaR6BFJQ&maxResults=8&singleEvents=true&futureevents=true&sortorder=ascending&alt=json-in-script',
  function(response) {
    var str = '';
    response.on('data', function(chunk) {
      str += chunk;
    });
    response.on('end', function() {
      obj = JSON.parse(str);
      return obj;
    });
  }
).end();

console.log(eventList);

app.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Tech & Tabletop Club',
    events: eventList
  })
});

/*
function listEvents() {
  var calendar = google.calendar('v3');
  calendar.events.list({
    calendarId: '5ud4dbia1ql8tpcqjeep9fd77k@group.calendar.google.com',
    key: 'AIzaSyDidlQlkYbB_LnljWn7T8YEzlyqaR6BFJQ',
    timeMin: (new Date()).toISOString(),
    maxResults: 8,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 8 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
      return events;
    }
  });
}*/

var server = app.listen(app.get('port'), app.get('ip'), function() {
  var address = server.address();
  console.log('[ttc] app running on http://%s:%s', address.address, address.port);
});
