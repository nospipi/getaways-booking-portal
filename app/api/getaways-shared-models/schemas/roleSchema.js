const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

//----------------------------------------------------------------------------

const roleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
});

roleSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

module.exports = roleSchema;
