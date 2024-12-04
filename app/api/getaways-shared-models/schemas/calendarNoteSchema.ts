import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------

export interface ICalendarNote extends Document {
  body: string;
  createdAt: Date;
  date: string;
  author_id: string;
  public: boolean;
}

//------------------------------------------------------------------------

const calendarNoteSchema = new Schema<ICalendarNote>({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  date: { type: String },
  author_id: { type: String, required: true },
  public: { type: Boolean, default: false },
});

calendarNoteSchema.plugin(mongoosePaginate);
calendarNoteSchema.plugin(mongooseAggregatePaginate);

//------------------------------------------------------------------------

export default calendarNoteSchema;
