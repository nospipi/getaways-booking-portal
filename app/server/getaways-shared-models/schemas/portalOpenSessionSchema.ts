import { Document, Schema } from "mongoose";

//------------------------------------------------------------------------------

export interface IOpenSession extends Document {
  id: string;
  createdAt: Date;
}

//------------------------------------------------------------------------------

const portalOpenSessionSchema = new Schema<IOpenSession>({
  id: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, //this will delete the document after 5 minutes (300s) if it still exists
  },
});

export default portalOpenSessionSchema;
