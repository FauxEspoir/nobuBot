exports.help = "nick <mention> <optional: name> :: change nickname of mentioned user, leave <name> empty for removing nickname";
exports.exec = (client, message, msgArray, callback) => {
  mention = message.mentions.users;
  if (mention.size > 0) {
    mention = mention.first();
    name = "";
    if (msgArray.length > 2) name = msgArray[2];
    message.guild.member(mention.id).setNickname(name).then(() => {
      message.channel.sendMessage('Nickname changed');
      callback();
    });
  } else {
    message.channel.sendMessage('Wrong syntax');
  }
}