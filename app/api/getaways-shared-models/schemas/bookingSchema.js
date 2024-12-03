const mongoose = require("mongoose");
const meetingPointSchema = require("./meetingPointSchema");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoosastic = require("mongoosastic");
const deepDiff = require("deep-diff").diff;

//------------------------------------------------------------------------------

const bookingSchema = new Schema(
  {
    ref: { type: String, default: "" },
    order_number: { type: String, default: "" },
    parent_booking_id: { type: String, default: "" },
    unique_booking_id: { type: String, default: "" },
    product_id: { type: String, default: "" },
    option_id: { type: String, default: "" },
    temp_option_id: { type: String, default: "" },
    start_time_id: { type: String, default: "" },
    temp_start_time_id: { type: String, default: "" },
    channel_id: { type: String, default: "" },
    product_time_slot: { type: String },
    booking_date: { type: String },
    date: { type: String },
    name: { type: String, default: "" },
    count: { type: Number, default: 1 },
    client_name: { type: String },
    client_email: { type: String, default: "" },
    client_phone: { type: String, default: "" },
    tickets: { type: Object, default: {} },
    billing_codes: { type: Array, default: [] },
    client_location: { type: String, default: "" },
    pickup_location: meetingPointSchema,
    pickup_time: { type: String, default: "" },
    client_messaged: { type: Boolean, default: false },
    client_response_status: { type: String, default: "PENDING" },
    notes: { type: String, default: "" },
    notes_list: { type: Array, default: [] },
    group: { type: Number, default: 1 },
    cancelled: { type: Boolean, default: false },
    planned: { type: Boolean, default: false },
    billed: { type: Boolean, default: false },
    total_paid: { type: Number, default: 0.0 },
    updated_at: { type: Array },
    email_history: { type: Array, default: [] },
    task_id: { type: String },
    tour_group_id: { type: String },
  },
  {
    minimize: false,
    //allows to save empty objects in db
  }
);
bookingSchema.plugin(mongoosastic);
bookingSchema.plugin(mongoosePaginate);

bookingSchema.pre("save", async function (next) {
  try {
    this.parent_booking_id = this?.order_number;

    next();
  } catch (error) {
    console.log("ERROR FROM PRE MIDDLEWARE IN BOOKING SCHEMA", error);
    next(error);
  }
});

bookingSchema.pre("findOneAndUpdate", async function (next) {
  console.log("PRE MIDDLEWARE IN BOOKING SCHEMA");
  try {
    const initialValues = this.getQuery();
    const old = await this.model.findOne(initialValues).lean(); // Using lean() to get plain JavaScript object
    delete old.__v;
    delete old._id;
    //delete old.pickup_location._id;
    if (old.pickup_location && old.pickup_location._id) {
      delete old.pickup_location._id;
    }
    delete old.updated_at;
    delete old.email_history;

    const updatedValues = this.getUpdate();
    const updatedValuesWithExclusions = Object.keys(updatedValues).reduce(
      (obj, key) => {
        if (key !== "__v" && key !== "_id" && key !== "updated_at") {
          obj[key] = updatedValues[key];
        }
        return obj;
      },
      {}
    );

    const differences = deepDiff(old, updatedValuesWithExclusions);

    if (differences) {
      const changes = differences.map((diff) => ({
        path: diff.path.join("."),
        before: diff.lhs,
        after: diff.rhs,
      }));
      const filter = [
        "pickup_location.__v",
        "pickup_location._id",
        "pickup_location",
      ];
      const filteredChanges = changes.filter(
        (change) => !filter.includes(change.path)
      );

      if (Array.isArray(updatedValues.updated_at)) {
        const lastUpdated = updatedValues.updated_at.slice(-1)[0];
        lastUpdated.changes = filteredChanges;
      }
    }

    next();
  } catch (err) {
    console.log("ERROR FROM PRE MIDDLEWARE IN BOOKING SCHEMA", err);
    next(err);
  }
});

module.exports = bookingSchema;
