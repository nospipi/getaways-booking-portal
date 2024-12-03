const mongoose = require("mongoose");
const { Schema } = mongoose;

//----------------------------------------------------------------------------

const meetingPointSchema = new Schema(
  {
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" },
    google_maps_url: { type: String, default: "" },
    instructions: { type: String, default: "" },
    img_url: { type: String, default: "" },
  },
  {
    minimize: false,
  }
);

module.exports = meetingPointSchema;
