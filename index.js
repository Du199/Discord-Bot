////////////////////////////////////////////
//>>>>>>>>>>>>>MAKE BY NTKHANG<<<<<<<<<<<<//
////////////////////////////////////////////


process.on('unhandledRejection', error => console.error(error));
process.on('uncaughtException', error => console.error(error));
  
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");
global.bot = {
  config,
  commands: new Map(),
  commandNoprefix: [],
  whenReply: [],
  database: {}
};

global.database = {
  channels: []
};

client.login(config.TOKEN);

client.on("ready", () => {
	console.log(`Đã đăng nhập ${client.user.tag}`);
  console.log("Prefix: "+config.PREFIX); 
  client.user.setPresence({
		activity: {
			name: "GAME",
			type: "PLAYING"
		},
		status: "online"
	});
});

const loadCmd = require("./bot/loadCommand.js");
loadCmd({ client, config });

//Create webSever
/*
const app = require("express")(); 
app.get('/', (req, res) => res.send ("NTKhang"));
app.listen(process.env.PORT);
*/