const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");
const moment = require("moment");

//------------------------------------------------------------------------

const noteSchema = new Schema({
  body: { type: String, required: true },
  date: {
    type: String,
    default: () => moment().format("YYYY-MM-DD"),
  },
  author_id: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  public: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
});
noteSchema.plugin(mongoosePaginate);
noteSchema.plugin(mongooseAggregatePaginate);

module.exports = noteSchema;
