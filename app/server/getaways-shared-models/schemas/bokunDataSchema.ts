import { Schema } from "mongoose";
import moment from "moment";

//------------------------------------------------------------------------

export interface IBokunData {
  action?: string;
  ref?: string;
  data?: unknown;
  date?: string;
}

//------------------------------------------------------------------------

const bokunDataSchema = new Schema<IBokunData>({
  action: { type: String },
  ref: { type: String },
  data: { type: Schema.Types.Mixed }, // Allows any data type
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

//------------------------------------------------------------------------

export default bokunDataSchema;
