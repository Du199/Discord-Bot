module.exports = {
  name: "cmd",
  descriptons: "load lệnh",
  author: "NTKhang",
  category: "system",
  use: "cmd load <tên lệnh>",
  example: "cmd load help",
  run: ({ message, args }) => {
    if (args[0] == "load") {
      try {
        const oldCommand = require("./"+args[1]+".js");
        delete require.cache[require.resolve("./"+args[1]+".js")];
        const newCommand = require("./"+args[1]+".js");
        const commands = global.bot.commands;
        commands.delete(oldCommand.name);
        commands.set(newCommand.name, newCommand);
        message.channel.send({
          embed: {
            description: "Đã load lệnh "+newCommand.name+" thành công",
            color: "#00ff17"
          }
        });
      }
      catch (e) {
        message.channel.send({
          embed: {
            color: "#ff0000",
            description: "Đã xảy ra lỗi: "+e.stack.split("\n").slice(0, 5).join("\n")
          }
        });
      }
    }
    
  }
};