import { Document, Schema } from "mongoose";

//------------------------------------------------------------------------------

export interface IOpenSession extends Document {
  booking_ref: string;
  expireAt: Date;
}

//------------------------------------------------------------------------------

const portalOpenSessionSchema = new Schema<IOpenSession>({
  booking_ref: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 300, //this will delete the document after 5 minutes (300s) if it still exists
    //the change stream in the model declaration will call the refresh endpoint to refresh the session in all consumers when a document is created or deleted
  },
});

export default portalOpenSessionSchema;
