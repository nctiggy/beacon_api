var mqtt = require('mqtt');

var MQTT  = mqtt.connect('mqtt://mosquitto');

MQTT.on('connect', function () {
  console.log("we are connected to MQTT");
});

module.exports = MQTT
