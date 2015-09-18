var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('welcome to the Lightswitch API');
});

app.listen(port, function(req, res){
    console.log('API Running on PORT: ' + port);
});