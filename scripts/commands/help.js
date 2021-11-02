module.exports = {
  name: "help",
  author: "NTKhang",
  use: "help {tên lệnh}",
  example: "help sim",
  category: "system",
  descriptions: "Xem cách sử dụng lệnh",
  run: ({ message, args }) => {
  const fs = require("fs-extra");
  const { MessageEmbed } = require("discord.js");
  const prefix = global.database.channels.find(item => item.id == message.guild.id).data.prefix ? global.database.channels.find(item => item.id == message.guild.id).data.prefix : global.bot.config.PREFIX;
  if (args[0]) allCommand(message);
  if (!args[0]) getCmd(message);
  
    function allCommand (message) {
      const embed = new MessageEmbed();
      const command = global.bot.commands.get(args[0]);
      if (!command) return message.channel.send({
        embed: embed.setColor("RED")
                    .setDescription("Lệnh "+args[0]+" không tồn tại")
        });
      var info = `Tên lệnh: ${command.name}`;
      if (command.descriptions) info += "\nTác dụng: " +command.descriptions;
      if (command.author) info += "\nTác giả: "+command.author;
      if (command.use) info += "\nCách dùng: ```" + command.use + "```";
      if (command.example) info += "\nVí dụ: "+command.example;
      
      return message.channel.send({
        embed: embed.setColor("GREEN")
                    .setDescription(info)
      });
    }

    function getCmd (message) {
      const valueCmd = global.bot.commands.values();
      const groupCommands = [];
      
      for (let command of valueCmd) {
        if (!groupCommands.some(item => item.name.toLowerCase() === command.category.toLowerCase())) {
          groupCommands.push({
            name: command.category.toLowerCase(),
            value: [command.name]
          });
        }
       else {
         groupCommands.find(item => item.name.toLowerCase() == command.category.toLowerCase()).value.push(command.name);
        }
      }
       
       groupCommands.map(item => {
         item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
         item.value = item.value.join(", ");
       });

      const embed = new MessageEmbed()
        .setColor("BLUE")
        .addFields(groupCommands)
        .setAuthor(`Hiện tại bot có ${global.bot.commands.size} lệnh có thể sử dụng, gõ ${prefix}help <tên lệnh> để xem chi tiết cách dùng lệnh đó`);
      return message.channel.send({ embed });
    }
  }
};