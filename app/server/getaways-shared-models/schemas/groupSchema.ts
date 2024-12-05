import { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

//-------------------------------------------------------------------------

export interface IGroup extends Document {
  title: string;
}

const groupSchema = new Schema<IGroup>({
  title: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
});

groupSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

//-------------------------------------------------------------------------

export default groupSchema;
