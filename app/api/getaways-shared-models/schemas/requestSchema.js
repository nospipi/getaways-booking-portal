const mongoose = require("mongoose");
const { Schema } = mongoose;

//-------------------------------------------------------------------------

const requestSchema = new Schema({
  requestedBy: { type: Object, required: true },
  handledBy: { type: Object, default: null },
  title: { type: String, required: true },
  messages: {
    type: [
      {
        type: {
          postedBy: { type: Object, required: true },
          date: { type: Date, default: Date.now },
          body: { type: String, required: true },
        },
        required: true,
      },
    ],
    required: [true, "You cannot submit an empty request"],
    validate: [
      (value) => value.length > 0,
      "You cannot submit an empty request",
    ],
  },
  closed: { type: Boolean, default: false },
  granted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = requestSchema;
