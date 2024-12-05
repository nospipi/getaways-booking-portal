import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import moment from "moment";

//------------------------------------------------------------------------

export interface INote extends Document {
  body: string;
  date?: string;
  author_id: string;
  pinned?: boolean;
  public?: boolean;
  done?: boolean;
}

//------------------------------------------------------------------------

const noteSchema = new Schema<INote>({
  body: { type: String, required: true },
  date: {
    type: String,
    default: () => moment().format("YYYY-MM-DD"),
  },
  author_id: { type: String, required: true },
  pinned: { type: Boolean, default: false },
  public: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
});

noteSchema.plugin(mongoosePaginate);
noteSchema.plugin(mongooseAggregatePaginate);

export default noteSchema;
