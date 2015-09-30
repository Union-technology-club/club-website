var express = require('express'),
    hbs = require('hbs'),
    hbsutils = require('hbs-utils')(hbs),
    bodyParser = require('body-parser'),
    google = require('googleapis');

var caldata = {
  events: [
    {
      url: "https://www.google.com/calendar/event?eid=djUzanZ1bWhtb3Nxam1mNDEwbzdibDhjNzhfMjAxNTEwMDJUMDAzMDAwWiA1dWQ0ZGJpYTFxbDh0cGNxamVlcDlmZDc3a0Bn",
      title: "Code Night",
      date: "October 1",
      time: "7:30 PM",
      location: "DB 307"
    },{
      url: "https://www.google.com/calendar/event?eid=aW9qM3A1MzE2bXRwbmFrZWFxdDlwdTh2a3NfMjAxNTEwMDdUMDAzMDAwWiA1dWQ0ZGJpYTFxbDh0cGNxamVlcDlmZDc3a0Bn",
      title: "Game Night",
      date: "October 6",
      time: "7:30 PM",
      location: "DB 302"
    },{
      url: "https://www.google.com/calendar/event?eid=ZnZzYWJocjdkOTExMGEycmxwYzI2Ymd2ZzggNXVkNGRiaWExcWw4dHBjcWplZXA5ZmQ3N2tAZw",
      title: "UI & Product Design Lecture",
      date: "October 7",
      time: "6:30 PM",
      location: "DB 302"
    },{
      url: "https://www.google.com/calendar/event?eid=NXJhbDV1MXM1dWo3ZW5qMnVjaDgwM2xmY2dfMjAxNTEwMTRUMDAzMDAwWiA1dWQ0ZGJpYTFxbDh0cGNxamVlcDlmZDc3a0Bn",
      title: "Code Night",
      date: "October 13",
      time: "7:30 PM",
      location: "DB 307"
    },{
      url: "https://www.google.com/calendar/event?eid=NGRkOTk0ZDRoa29lMGhnM29zZ2tuMmlobThfMjAxNTEwMjNUMDAzMDAwWiA1dWQ0ZGJpYTFxbDh0cGNxamVlcDlmZDc3a0Bn",
      title: "Game Night",
      date: "October 22",
      time: "7:30 PM",
      location: "DB 302"
    },{
      url: "https://www.google.com/calendar/event?eid=djUzanZ1bWhtb3Nxam1mNDEwbzdibDhjNzhfMjAxNTEwMzBUMDAzMDAwWiA1dWQ0ZGJpYTFxbDh0cGNxamVlcDlmZDc3a0Bn",
      title: "Code Night",
      date: "October 29",
      time: "7:30 PM",
      location: "DB 307"
    }
  ]
}

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

app.get('/', function(req,res,next){
    res.render('index', {
        title: 'Tech & Tabletop Club',
        events: caldata.events
    })
});

var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log('[ttc] app running on http://%s:%s', address.address, address.port);
});
