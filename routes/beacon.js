var express = require('express');
var router = express.Router();

var Beacon = require('../models/beacon');
var MQTT = require('../models/mqtt');

/* GET home page. */
router.get('/', function(req, res, next) {
  Beacon.find({}, function(err, beacons) {
    if (err) throw err;
    res.send(JSON.stringify(beacons));
  });
});

router.post('/', function(req, res, next) {
  console.log("buckle your seatbelts");
  MQTT.publish('/customer/drivethru', JSON.stringify(req.body));
  var newBeacon = Beacon(req.body);
  newBeacon.save(function(err) {
    if (err) throw err;
    res.sendStatus(200)
    console.log('New beacon entry');
  });
});

router.get('/:customer_id', function(req, res, next) {
  Beacon.find({
    phone_id: req.params.phone_id
  }, function(err, beacon) {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(beacon));
  });
});

module.exports = router;
