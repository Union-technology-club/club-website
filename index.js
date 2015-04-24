var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var gmailauth = require('./auth.js');

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

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: gmailauth
});

/*
var mailOptions = {
    from: 'Union TTC <uctechtabletop@gmail.com>',
    to: 'uctechtabletop@gmail.com, keawade@gmail.com',
    subject: 'Feedback from website'
};
*/

app.get('/', function(req,res,next){
    res.render('index', {
        title: 'Tech & Tabletop Community'
    })
});

var server = app.listen(app.get('port'), app.get('ip'), function() {
    var address = server.address();
    console.log('[ttc] app running on http://%s:%s', address.address, address.port);
});
