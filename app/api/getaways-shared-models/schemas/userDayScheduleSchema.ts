import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//--------------------------------------------------------------------------

export interface IUserDaySchedule extends Document {
  date: string;
  user: string;
  tourGroups: {
    role: string; // Role schema ID
    id: string; // TourGroups schema ID
    details: string;
  }[];
  isDayOff: boolean;
  isLeave: boolean;
  isSeen: boolean;
  comments: {
    text: string;
    date: string;
    user: string;
  }[];
}

//--------------------------------------------------------------------------

const userDayScheduleSchema = new Schema<IUserDaySchedule>(
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

export default userDayScheduleSchema;
