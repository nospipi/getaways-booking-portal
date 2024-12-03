const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

//------------------------------------------------------------------------

const calendarNoteSchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  date: String,
  author_id: { type: String, required: true },
  public: { type: Boolean, default: false },
});
calendarNoteSchema.plugin(mongoosePaginate);
calendarNoteSchema.plugin(mongooseAggregatePaginate);

module.exports = calendarNoteSchema;
