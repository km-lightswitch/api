var express = require('express');
var registrations = require('./models/registrations');

var app = express();
var port = process.env.PORT || 3000;

var registrationsRouter = express.Router();
registrationsRouter.route('/registrations')
    .get(function (req, res) {
        registrations.getRegistrations(function(err, data){
            if (err) res.status(500).send(err);
            else res.json(data.Items);
        });
    });
app.use('/v1', registrationsRouter);

app.get('/', function (req, res) {
    res.send('Welcome to the Lightswitch API');
});

app.listen(port, function (req, res) {
    console.log('API Running on PORT: ' + port);
});