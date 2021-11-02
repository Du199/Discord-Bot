module.exports = {
  name: "dhbc",
  descriptons: "game đuổi hình bắt chữ",
  author: "NTKhang",
  category: "game",
  use: "dhbc",
  example: "dhbc",
  run: async ({ message, args }) => {
    const axios = require("axios");
    const fs = require("fs-extra");
    const Discord = require("discord.js");
    const MessageEmbed = Discord.MessageEmbed;
    
    const datagame = (await axios.get("https://goatbot.tk/api/duoihinhbatchu")).data;
    const { wordcomplete, casi, image1and2 } = datagame.data;
    
    const dataSend = await message.channel.send({
      embed: {
        color: "#f1ab0e",
        description: `Hãy reply tin nhắn này với câu trả lời\n${wordcomplete.replace(/\S/g, "█ ")}${casi ? `\nĐây là tên bài hát của ca sĩ ${casi}` : ''}`,
        image: {
          url: image1and2
        }
      }
    });
    
    
    global.bot.whenReply[dataSend.id] = {
      messageID: dataSend.id,
      nameCmd: "dhbc",
      wordcomplete
    };
  },
  
  
  whenReply: ({ message, Reply }) => {
    let { wordcomplete, messageID } = Reply;
    function formatText (text) {
      return text.normalize("NFD")
      .toLowerCase()
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
    }
    
    if (formatText(message.content) == formatText(wordcomplete)) {
      message.channel.send("Chúc mừng bạn đã trả lời đúng");
    }
    else {
      message.reply(`Opps, Sai rồi`);
    }
  }
};