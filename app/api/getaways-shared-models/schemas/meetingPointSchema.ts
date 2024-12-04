import { Schema, Document } from "mongoose";

//----------------------------------------------------------------------------

export interface IMeetingPoint extends Document {
  name?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  google_maps_url?: string;
  instructions?: string;
  img_url?: string;
}

const meetingPointSchema = new Schema<IMeetingPoint>(
  {
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" },
    google_maps_url: { type: String, default: "" },
    instructions: { type: String, default: "" },
    img_url: { type: String, default: "" },
  },
  {
    minimize: false,
  }
);

export default meetingPointSchema;
