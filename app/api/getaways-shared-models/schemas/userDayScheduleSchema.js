const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

//--------------------------------------------------------------------------

const userDayScheduleSchema = new Schema(
  {
    date: { type: String },
    user: { type: String, required: true },
    tourGroups: {
      type: [
        {
          role: String, //role schema id
          id: String, //tourGroups schema id
          details: String,
        },
      ],
      default: [],
    },
    isDayOff: { type: Boolean, default: false },
    isLeave: { type: Boolean, default: false },
    isSeen: { type: Boolean, default: false },
    comments: [
      {
        text: String,
        date: String,
        user: String,
      },
    ],
  },
  {
    minimize: false,
  }
);

userDayScheduleSchema.plugin(mongoosePaginate);
userDayScheduleSchema.plugin(mongooseAggregatePaginate);

module.exports = userDayScheduleSchema;
