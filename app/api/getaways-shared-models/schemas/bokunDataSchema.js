const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");

//------------------------------------------------------------------------

const bokunDataSchema = new Schema({
  action: String,
  ref: String,
  data: {
    type: Schema.Types.Mixed, // Allows any data type
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

module.exports = bokunDataSchema;
