import { Document, Schema } from "mongoose";

//------------------------------------------------------------------------
export interface IMessageDraft extends Document {
  title: string;
  body: string;
}

//------------------------------------------------------------------------

const messageDraftSchema = new Schema<IMessageDraft>({
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export default messageDraftSchema;
