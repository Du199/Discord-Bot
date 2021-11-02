module.exports = {
  name: "avt",
  descriptons: "game đuổi hình bắt chữ",
  author: "NTKhang",
  category: "game",
  use: "avt <mã số nhân vật hoặc tên nhân vật> | <chữ nền> | <chữ ký> | <tên màu tiếng anh hoặc mã màu nền (hex color) hoặc để trống>",
  example: "avt luffy | Thành Khang | NTKhang | yellow",
  run: async ({ message, args }) => {
    const axios = require("axios");
		const fs = require("fs-extra");
    const content = args.join(" ").replace(/\s+/g, ' ').replace(/( \| |\| |\|| \|)/g, "|").split("|");
	  let idNhanVat, tenNhanvat;
	  const chu_nen = content[1];
    const chu_ky  = content[2];
    const mau_nen = content[3];
	  const dataChracter = (await axios.get("https://taoanhdep.kaysil.dev/v1/wibu/list")).data.data;
  	if (!isNaN(content[0])) {
      idNhanVat = parseInt(content[0]);
      tenNhanvat = dataChracter[idNhanVat].characterName;
    }
    else {
      findChracter = dataChracter.find(item => item.characterName.toLowerCase() == content[0].toLowerCase());
      if (findChracter) {
        idNhanVat = findChracter.characterId;
        tenNhanvat = content[0];
      }
      else return message.channel.send("Không tìm thấy nhân vật mang tên " + content[0] + " trong danh sách nhân vật");
    }
    
    var linkapi = encodeURI(`https://taoanhdep.kaysil.dev/v1/wibu/create?id_nhanvat=${idNhanVat}&chu_nen=${chu_nen}&chu_ky=${chu_ky}`);
    mau_nen ? linkapi += `&mau_nen=${encodeURIComponent(mau_nen)}` : "";
    
    message.channel.send({
      embed: {
        color: mau_nen ? mau_nen.startsWith("#") ? mau_nen : "#eeff00" :"#eeff00",
        description: `Your avatar\nChữ nền: ${chu_nen}\nChữ ký: ${chu_ky}\nID nhân vật: ${idNhanVat}\nNhân vật: ${tenNhanvat}\nMàu: ${mau_nen || "mặc định"}`,
        image: { 
          url: linkapi
        }
      }
    });
  }
};