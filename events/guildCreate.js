exports.exec = (client) => {
  return () => {
    client.bot.channels.get('265147163321958400').sendMessage(client.bot.user.username + " has been added to another guild! Total guild count: " + client.bot.guilds.size)
  };
}