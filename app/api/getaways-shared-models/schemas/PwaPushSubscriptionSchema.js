const mongoose = require("mongoose");
const { Schema } = mongoose;

//-------------------------------------------------------------------------

const PwaPushSubscriptionSchema = new Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

module.exports = PwaPushSubscriptionSchema;
