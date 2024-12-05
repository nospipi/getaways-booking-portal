import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//---------------------------------------------------------------------------

export interface INotification extends Document {
  title: string;
  body?: string;
  date?: Date;
  data: {
    type: string;
  };
}

//---------------------------------------------------------------------------

const notificationSchema = new Schema<INotification>({
  title: { type: String, required: true },
  body: String,
  date: { type: Date, default: Date.now },
  data: {
    type: Object,
    default: {
      type: { type: String, default: "" },
    },
  },
});

notificationSchema.plugin(mongoosePaginate);

export default notificationSchema;
