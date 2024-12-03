const mongoose = require("mongoose");
const { Schema } = mongoose;

//------------------------------------------------------------------------

const messageDraftSchema = new Schema({
  title: String,
  body: String,
});

module.exports = messageDraftSchema;
