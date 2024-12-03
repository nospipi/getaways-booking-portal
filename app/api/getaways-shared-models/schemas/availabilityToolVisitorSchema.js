const mongoose = require("mongoose");
const { Schema } = mongoose;

//------------------------------------------------------------------------

const availabilityToolVisitorSchema = new Schema({
  ip: String,
  city: String,
  country: String,
  latitude: String,
  longitude: String,
  region: String,
  timestamp: String,
});

module.exports = availabilityToolVisitorSchema;
