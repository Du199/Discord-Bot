const chalk = require("chalk");

module.exports = ({ client }) => {
  let prefix = global.bot.config.PREFIX;
  const dataProcessing = require("../bot/dataProcessing.js")({ client });
  
  client.on("message", async message => {
    if (message.author.bot) return;
    
    function makeColor(hex, text) {
      return chalk.hex(hex)(text);
    }
    const { database } = global;
    if (!database.channels.some(item => item.id == message.guild.id)) dataProcessing.channels.createData(message.guild.id);
    if (database.channels.find(item => item.id == message.guild.id).data.prefix) prefix = database.channels.find(item => item.id == message.guild.id).data.prefix;
    
    const channelIDColor = `${makeColor("#0086ec", "ChannelId:")} ${message.guild.id}`;
    const authorName = `${makeColor("#17bd00", message.author.username+"#")}${makeColor("#17bd00", message.author.discriminator)}`;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = global.bot.commands.get(commandName);
    if (message.content.startsWith(prefix)) {
      if (command) {
        try {
          command.run({ args, message, client, dataProcessing });
          console.log(`${makeColor("#09ff00", "RUN COMMAND")} ${channelIDColor} ¦ ${authorName} ¦ ${makeColor("#ff0033", commandName)} ¦ ${makeColor("#c4ff00", args.join(" "))}`);
        }
        catch(error) {
          console.log(error.stack);
          message.channel.send(`Đã xảy ra lỗi khi thực thi lệnh ${command.name}: ${error} Line: ${infoe}`);
        }
      }
    }
  
    const cmdNoprefix = global.bot.commandNoprefix;
	  for (const commandName of cmdNoprefix) {
			const command = global.bot.commands.get(commandName);
			try {
				command.event({ message, args, client, dataProcessing });
			}
			catch (error) {
			  console.log(error.stack);
			  message.channel.send("Đã xảy ra lỗi");
			}
		}
		
		// REPLY 
		
		if (message.reference) {
		  const whenReply = globalbot.whenReply;
		  const Reply = whenReply[message.reference.messageID];
  		if (!Reply) return;
  		const command = globalbot.commands.get(Reply.nameCmd);
  		try {
  		  if (!command) throw new Error("Không tìm thấy tên lệnh để thực hiện phản hồi này");
  			return command.whenReply({ message, args, client, dataProcessing, Reply });
  		}
  		catch(err) {
  		  console.log(`Đã xảy ra lỗi khi thực thi lệnh reply ở lệnh ${Reply.nameCmd} ${err.stack}`, "WHEN REPLY");
  		  message.channel.send(`Đã xảy ra lỗi khi thực thi lệnh reply ở lệnh ${Reply.nameCmd} ${err.stack.split("\n").slice(0, 3).join("\n")}`);
  		}
		}
		
		
  });
};