import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//-------------------------------------------------------------------------------

export interface IAnnouncement extends Document {
  title: string;
  body: string;
  date: Date;
  critical: boolean;
  pinned: boolean;
  author: string;
}

//-------------------------------------------------------------------------------

const announcementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  body: {
    type: String,
    required: [true, "You cannot publish an empty announcement"],
    minlength: [10, "Announcements must have more than 10 characters"],
  },
  date: { type: Date, default: Date.now },
  critical: { type: Boolean, required: true },
  pinned: { type: Boolean, default: false },
  author: { type: String, required: true },
});

announcementSchema.plugin(mongoosePaginate);

//-------------------------------------------------------------------------------

export default announcementSchema;
