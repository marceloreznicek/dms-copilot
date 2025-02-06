const dbQueries = require("../db/queries");
const auxFunctions = require("./basicSessionInfo");

async function saveEvent(req, eventName, eventParam = null) {
  
  const userIP = auxFunctions.getClientIP(req);
  const deviceType = auxFunctions.getDeviceType(req);

  await dbQueries.insertData("events", {
    date: new Date(),
    user_ip: userIP,
    event_name: eventName,
    event_param: eventParam,
    user_device_type: deviceType
  });
}

module.exports = { saveEvent };
