module.exports = {
  name: "run",
  descriptons: "test code nhanh",
  author: "NTKhang",
  category: "system",
  use: "run",
  example: "run",
  run: async ({ message, args, client }) => {
  	try {
  		eval("(async () => {"+args.join(" ")+"})();");
  		message.channel.send("Done");
  	}
  	catch (e) {
  		message.channel.send(`Đã có lỗi xảy ra: ${e.message}`);
  	}
  }
};