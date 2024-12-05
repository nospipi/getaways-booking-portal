import { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

//----------------------------------------------------------------------------

export interface IRole extends Document {
  title: string;
}

//----------------------------------------------------------------------------

const roleSchema = new Schema<IRole>({
  title: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
});

roleSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

export default roleSchema;
