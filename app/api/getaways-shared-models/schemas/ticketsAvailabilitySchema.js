const mongoose = require("mongoose");
const { Schema } = mongoose;

//------------------------------------------------------------------------

const ticketsAvailabilitySchema = new Schema({
  place: String,
  placedate: String,
  id: String,
  slots: [
    {
      zone: String,
      id: String,
      avail: String,
    },
  ],
});

ticketsAvailabilitySchema.pre("save", function (next) {
  this.id = this.place + this.placedate;
  next();
});

module.exports = ticketsAvailabilitySchema;
