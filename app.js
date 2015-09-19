var express = require('express'),
    bodyParser = require('body-parser'),
    registrations = require('./models/registrations'),
    registrationsRouter = require('./routes/registrations_router')(registrations);

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/v1/registrations', registrationsRouter);

app.get('/', function (req, res) {
    res.send('Welcome to the Lightswitch API');
});

var port = process.env.PORT || 3000;
app.listen(port, function (req, res) {
    console.log('API Running on PORT: ' + port);
});