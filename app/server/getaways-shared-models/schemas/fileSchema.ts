import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------

export interface IFile extends Document {
  _id: string;
  name: string;
  description: string;
  type: string;
  size: number;
  data: string;
}

//------------------------------------------------------------------------

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: String, required: true },
});

fileSchema.plugin(mongoosePaginate);
fileSchema.plugin(mongooseAggregatePaginate);

//------------------------------------------------------------------------

export default fileSchema;
