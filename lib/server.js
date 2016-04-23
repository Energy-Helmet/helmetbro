var express = require('express');
var app     = express();

var bot     = require('./bot');

app.get('/messages/:channel', function(req, res) {
  res.json(bot.messages[req.params.channel] || []);
});

module.exports = {
  start: function() {
    app.listen(process.env.PORT || 3000, function() {

    });
  }
};
