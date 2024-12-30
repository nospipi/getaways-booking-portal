import { Document, Schema } from "mongoose";

//------------------------------------------------------------------------------

export interface IOpenSession extends Document {
  booking_ref: string;
  createdAt: Date;
}

//------------------------------------------------------------------------------

const portalOpenSessionSchema = new Schema<IOpenSession>({
  booking_ref: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, //this will delete the document after 5 minutes (300s) if it still exists
  },
});

export default portalOpenSessionSchema;
