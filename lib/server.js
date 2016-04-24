var request = require('request');

var express = require('express');
var cors    = require('cors');
var app     = express();

var bot     = require('./bot');

app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(__dirname + '/../public'));

app.get('/messages/:channel', function(req, res) {
  res.json(bot.messages[req.params.channel] || []);
});

app.post('/watson-key', function(req, res) {
  var url = [
    'https://',
    process.env.WATSON_USER, ':', process.env.WATSON_PASSWORD,
    '@stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api'
  ].join('');
  request({ url: url }, function(error, response, body) {
    res.json({ key: body });
  });
});

module.exports = {
  start: function() {
    app.listen(process.env.PORT || 3000, function() {

    });
  }
};
