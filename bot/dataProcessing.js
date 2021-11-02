const { writeFileSync, existsSync } = require("fs-extra");
const chalk = require("chalk");

module.exports = ({ client }) => {
  const pathDataChannels = __dirname + "/../database/channels.json";
	if (!existsSync(pathDataChannels)) writeFileSync(pathDataChannels, "[]");
	
  const dataChannels = require(pathDataChannels);
  global.database.channels = dataChannels;
  function saveData() {
		writeFileSync(pathDataChannels, JSON.stringify(dataChannels, null, 2));
	}
	
	return {
    channels: {
      createData: function(channelId, callback) {
        try {
          if (dataChannels.some(item => item.id == channelId)) throw new Error(`Channel mang id ${channelId} đã tồn tại trong database`);
          const data = {
            id: channelId,
            data: {}
          };
          dataChannels.push(data);
          saveData();
          console.log(chalk.hex("#ff7100")("New channel data") ` ${channel}`);
          if (callback && typeof callback == "function") callback(null, data);
        }
        catch(err) {
					if (callback && typeof callback == "function") callback(err, null);
    	    return err;
				}
      },
      getData: function(channelId, callback) {
        try {
          const dtChannel = dataChannels.find(item => item.id == channelId);
          if (!dtChannel) throw new Error(`Channel mang id ${channelId} không tồn tại trong database`);
          if (callback && typeof callback == "function") callback(null, dtChannel);
          return dtChannel;
        }
        catch(err) {
					if (callback && typeof callback == "function") callback(err, null);
    	    return err;
				}
      },
		  setData: function(channelId, options, callback) {
				try {
					if (typeof options != "object") throw new Error("Tham số options phải là một object");
					const dtChannel = dataChannels.find(item => item.id == channelId);
					if (!dtChannel) throw new Error("Channel mang id " +channelId+ " không tồn tại trong database");
          for (let key in options) {
            dtChannel[key] = options[key];
          }
          saveData();
          if (callback && typeof callback == "function") callback(null, dataChannels[channelId]);
    	    return dataChannels.find(item => item.id == channelId);
				}
				catch(err) {
					if (callback && typeof callback == "function") callback(err, null);
    	    return err;
				}
		  },
		  delData: function(channelId, callback) {
		    try {
		      dataChannels.splice(dataChannels.findIndex(item => item.id == channelId));
		      if (callback && typeof callback == "function") callback(null, true);
		      return true;
		    }
		    catch(err) {
					if (callback && typeof callback == "function") callback(err, null);
    	    return err;
				}
		  }
	  }
	};

};