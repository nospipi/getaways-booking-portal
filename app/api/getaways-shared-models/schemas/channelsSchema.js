const mongoose = require("mongoose");
const { Schema } = mongoose;

//--------------------------------------------------------------------

const channelsSchema = new Schema({
  title: { type: String, required: true },
  commission_rate: { type: Number, required: true, default: 0 },
});

module.exports = channelsSchema;
