const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

//------------------------------------------------------------------------

const vehicleServiceLogEntrySchema = new Schema({
  vehicle_id: String,
  assignee: String,
  workshop: String,
  date: String,
  odometer: String,
  cost: String,
  repairs: [String],
  notes: String,
});
vehicleServiceLogEntrySchema.plugin(mongoosePaginate);

module.exports = vehicleServiceLogEntrySchema;
