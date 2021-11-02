module.exports = {
  name: "uptime",
  author: "NTKhang",
  use: "uptime",
  example: "uptime",
  category: "info",
  descriptions: "Xem thời gian bot hoạt động",
  run: ({message, client}) => {
    const timeStart = Date.now();
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60)),
  		minutes = Math.floor((time % (60 * 60)) / 60),
  		seconds = Math.floor(time % 60);
  	message.channel.send(`Bot đã hoạt động được\n${hours}h ${minutes}p ${seconds}s\nĐộ trễ: ${client.ws.ping}ms\n===== Admin: NTKhang =====`);
  }
};