const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

//-------------------------------------------------------------------------

const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
});

groupSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

module.exports = groupSchema;
