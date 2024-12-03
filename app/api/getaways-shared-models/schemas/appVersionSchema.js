const mongoose = require("mongoose");
const { Schema } = mongoose;

//------------------------------------------------------------------------

const appVersionSchema = new Schema({
  version: { type: String, required: true },
  date: { type: Date, default: Date.now },
  release_notes: { type: String, required: true },
  shouldBeForcedUpdate: { type: Boolean, required: true },
  ios: Boolean,
  android: Boolean,
});

module.exports = appVersionSchema;
