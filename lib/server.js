var express = require('express');
var cors    = require('cors')
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

module.exports = {
  start: function() {
    app.listen(process.env.PORT || 3000, function() {

    });
  }
};
