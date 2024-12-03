const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

//------------------------------------------------------------------------

const taskGuestSchema = new Schema({
  name: { type: String, default: "" },
  count: { type: Number, default: 1 },
});

const pickupSchema = new Schema({
  meeting_point: String,
  time: String,
  details: String,
  lat: String,
  lon: String,
  guests: [taskGuestSchema],
});

const taskSchema = new Schema(
  {
    product: { type: String, required: true },
    option_id: { type: String, required: true },
    date: { type: String, required: true },
    assignees: Array,
    vehicle_id: String,
    pickups: [pickupSchema],
    details: String,
    tour_group_id: String,
    author_id: { type: String, required: true },
  },
  {
    minimize: false,
    //allows to save empty objects in db
  }
);

taskSchema.plugin(mongoosePaginate);
taskSchema.plugin(mongooseAggregatePaginate);

module.exports = taskSchema;
