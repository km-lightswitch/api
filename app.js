var express = require('express'),
    bodyParser = require('body-parser'),
    registrations = require('./models/registrations');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var registrationsRouter = express.Router();
registrationsRouter.route('/registrations')
    .post(function (req, res) {
        var body = req.body
        registrations.register(body, function (err, data) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json({email: body.email});
            }
        });
    })
    .get(function (req, res) {
        registrations.getRegistrations(function (err, data) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(data.Items);
            }
        });
    });
app.use('/v1', registrationsRouter);

app.get('/', function (req, res) {
    res.send('Welcome to the Lightswitch API');
});

var port = process.env.PORT || 3000;
app.listen(port, function (req, res) {
    console.log('API Running on PORT: ' + port);
});