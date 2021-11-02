module.exports = ({ client, config }) => {
  const fs = require("fs-extra");
  const chalk = require("chalk");
  const ascii = require("ascii-table");
  let tableCommands = new ascii("Commands");
  let tableCommandsEvent = new ascii("CommandsEvent");
  tableCommands.setHeading = ("","Command", "Status");
  tableCommandsEvent.setHeading = ("CmxEvent", "Status");
  const commands = fs.readdirSync(__dirname + "/../scripts/commands/").filter((file) => file.endsWith(".js"));
  let i = 1;
  let ii = 1;
  
  for (const file of commands) {
    try {
  		const command = require(__dirname + "/../scripts/commands/" + file);
  		const commandName = command.name;
  		global.bot.commands.set(commandName, command);
  		tableCommands.addRow(i++, commandName, "Success ✅");
  		
  		if (command.event) {
  		  try {
    			const commandNoprefix = global.bot.commandNoprefix;
    			commandNoprefix.push(commandName);
    			tableCommandsEvent.addRow(ii++, commandName, "Success ✅");
  		  }
  		  catch(e) {
  	      tableCommandsEvent.addRow(ii++, commandName, "❎");
  		  }
  		}
  		
  		if (command.whenReply) global.bot.whenReply.push(commandName);
  	}
  	catch(e) {
  	  console.log(e.stack);
  	  tableCommands.addRow(i++, command, "❎");
  	}
  }
  
	console.log(tableCommands.toString());
  console.log(tableCommandsEvent.toString());
  global.bot.database.dataChannels = require("../database/channels.json");
  require("../handler/message.js")({ config, client });

};