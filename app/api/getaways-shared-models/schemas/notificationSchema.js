const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

//---------------------------------------------------------------------------

const notificationSchema = new Schema({
  title: { type: String, required: true },
  body: String,
  date: { type: Date, default: Date.now },
  data: {
    type: Object,
    default: {
      type: { type: String, default: "" },
    },
  },
});
notificationSchema.plugin(mongoosePaginate);

module.exports = notificationSchema;
