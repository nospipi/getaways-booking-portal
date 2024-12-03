const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

//--------------------------------------------------------------------------

const tourGroupSchema = new Schema({
  product_id: String,
  product: String,
  option_id: String,
  temp_option_id: String,
  start_time_id: String,
  temp_start_time_id: String,
  date: String,
  time: String,
  bookings: [{ type: Schema.Types.ObjectId, ref: "booking" }], //need to be populated
  task_id: String,
  notes: String,
  notes_list: { type: Array, default: [] }, // -
  visible_in_planner: { type: Boolean, default: true },
  guide_id: String,
  guide_uds_id: String,
  guide_confirmation: String,
  guide_details: String,
  guides_asked: Array,
  guide_email_sent: Boolean,
  vehicle_id: String,
  index: {
    type: Number,
    default: 1,
  },
  vehicle_platform_entry: String,
});

//TODO temporary //unset product when is fixed in all apps
tourGroupSchema.pre("save", function (next) {
  if (this.product_id && !this.product) {
    this.product = this.product_id;
  }
  next();
});

tourGroupSchema.plugin(mongoosePaginate);
tourGroupSchema.plugin(mongooseAggregatePaginate);

module.exports = tourGroupSchema;
