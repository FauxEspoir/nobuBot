var fs = require('fs');
exports.exec = (client, callback) => {
  time = Date.now();
  client.commands = {};
  client.events = [];
  client.prefix = process.env.PREFIX || client.config.prefix;
  client.help = "```asciidoc\n";
  fs.readdirSync(__dirname + '/../commands/').forEach(function(file) {
    if (!file.startsWith('!')) client.help += "== " + file + "\n";
    help = [];
    fs.readdirSync(__dirname + '/../commands/' + file + '/').forEach(function(file2) {
      if (file2.match(/\.js$/) !== null && file2 !== 'index.js') {
        var name = file2.replace('.js', '');
        delete require.cache[require.resolve('../commands/' + file + '/' + file2)];
        client.commands[name] = require('../commands/' + file + '/' + file2);
        client.commands[name].count = 0;
        taken = Date.now() - time;
        time = taken + time;
        console.log("Command " + name + " loaded. Took: " + taken + "ms");
        if (!file.startsWith('!')) {
          help.push(name);
        }
      }
    });
    client.help += help.join(' | ') + '\n';
  });
  fs.readdirSync(__dirname + '/../events/').forEach(function(file) {
    var name = file.replace('.js', '');
    delete require.cache[require.resolve('../events/' + file)];
    client.events.push({name, exec: require('../events/' + file).exec});
    taken = Date.now() - time;
    time = taken + time;
    console.log("Event " + name + " loaded. Took: " + taken + "ms");
  });
  client.help += "\nUse " + client.prefix + "help <command> for individual command helps```";
  if (typeof callback == "function") {
    callback();
  }
}