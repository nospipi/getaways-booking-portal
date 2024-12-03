const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

//------------------------------------------------------------------------------

const vehicleSchema = new Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  type: {
    type: String,
    required: true,
  },
  max_capacity: Number,
  color: {
    type: String,
    required: true,
  },
  gps_tracker_uid: String,
  position: {
    latitude: Number,
    longitude: Number,
    speed: Number,
    heading: Number,
    updated_at: Date,
  },
  upcoming_scheduled_service: {
    type: [
      {
        date: String,
        time: String,
        workshop: String,
        planned_repairs: [String],
      },
    ],
    default: [],
  },
  platform_entry_required: {
    type: Boolean,
    required: true,
  },
});
vehicleSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

module.exports = vehicleSchema;
