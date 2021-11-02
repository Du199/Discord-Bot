module.exports = {
  name: "setprefix",
  author: "NTKhang",
  use: "setprefix [prefix muốn đổi]",
  example: "setprefix #",
  category: "system",
  descriptions: "Đổi prefix của bot",
  run: ({ message, client, args, dataProcessing }) => {
    if (!args[0]) return message.channel.send("Phần prefix cần đổi không được để trống");
    
    const data = dataProcessing.channels.getData(message.guild.id).data;
    data.prefix = args[0];
    dataProcessing.channels.setData(message.guild.id, {
      data: data
    }, function(err, info) {
      if (err) return message.channel.send(`Đã xảy ra lỗi ${err.name}: ${err.message}`);
      else return message.channel.send("Đã đổi prefix thành ```" + args[0] + "```");
    });
  },
    
  event: ({ message, client, args }) => {
    if (message.content.toLowerCase() === "prefix") {
      const prefixSystem = global.bot.config.PREFIX;
      const prefixChannel = global.database.channels.find(item => item.id == message.guild.id).data.prefix ? global.database.channels.find(item => item.id == message.guild.id).data.prefix : global.bot.config.PREFIX;
      message.channel.send({
      embed: {
        color: "#2dff00",
        description: `Prefix của hệ thống: \`\`\`${prefixSystem}\`\`\`\nPrefix của kênh bạn: \`\`\`${prefixChannel}\`\`\``
      }
    });
    }
  }
};