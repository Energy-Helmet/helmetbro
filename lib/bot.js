var ex = {
  messages: {}
};

var SECONDS_BEFORE_MESSAGE_GOES_AWAY = 15;

// setInterval(function() {
//   var now = +new Date;
//   for (var i in ex.messages) {
//     if (ex.messages[i][0]) {
//       var then = parseInt(ex.messages[i][0].ts)
//       if ((then + SECONDS_BEFORE_MESSAGE_GOES_AWAY) <= (now / 1000)) {
//         ex.messages[i].shift();
//       }
//     }
//   }
// }, 500);

var Bot = require('slackbots');

var settings = {
  token: process.env.SLACK_TOKEN,
  name: 'helmetbro'
};

var bot = new Bot(settings);

bot.on('start', function() {
  var id     = bot.self.id;

  var channels = bot.channels.reduce(function(acc, group) {
    acc[group.id] = group;
    return acc;
  }, {});
  var groups = bot.groups.reduce(function(acc, group) {
    acc[group.id] = group;
    return acc;
  }, {});
  var users  = bot.users.reduce(function(acc, user) {
    acc[user.id] = user.real_name || user.name;
    return acc;
  }, {});
  var avatars = bot.users.reduce(function(acc, user) {
    acc[user.id] = user.profile.image_32;
    return acc;
  }, {});

  bot.on('message', function(data) {
    if (data.type === 'message') {
      if (data.text.indexOf('<@' + id + '>:') === 0) { // msg to helmet bro

      }

      for (var userId in users) {
        data.text = data.text.replace('<@' + userId + '>:', '<b>' + users[userId] + ':</b>');
      }

      var channelName;
      if (groups[data.channel]) {
        channelName = groups[data.channel].name;
      } else if (channels[data.channel]) {
        channelName = channels[data.channel].name;
      } else return;

      if (ex.messages[channelName] === undefined) {
        ex.messages[channelName] = [];
      }
      ex.messages[channelName].push({
        from: {
          name:   users[data.user],
          avatar: avatars[data.user]
        },
        text: data.text,
        ts:   data.ts
      });
      if (ex.messages[channelName].length > 5) {
        ex.messages[channelName].shift();
      }
    }
  });
});

module.exports = ex;
