var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectWithRetry = function() {
  return mongoose.connect('mongodb://mongo/beacon',function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we are connected to mongo!");
});

/* Define the mongoose schema */
var beaconSchema = new Schema({
    device_id: String,
    customer_id: { type: String, required: true },
    beacon_uuid: String,
    beacon_major: Number,
    beacon_minor: Number,
    store_id: String,
    rssi: Number,
    segment_id: Number,
    timestamp : { type : Date, default: Date.now }
});


var Beacon = mongoose.model('Beacon', beaconSchema);

module.exports = Beacon;
