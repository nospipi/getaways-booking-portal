import { Document, Schema } from "mongoose";

//------------------------------------------------------------------------

export interface IAvailabilityToolVisitor extends Document {
  ip?: string;
  city?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  region?: string;
  timestamp?: string;
}

//------------------------------------------------------------------------

const availabilityToolVisitorSchema = new Schema<IAvailabilityToolVisitor>({
  ip: { type: String },
  city: { type: String },
  country: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  region: { type: String },
  timestamp: { type: String },
});

//------------------------------------------------------------------------

export default availabilityToolVisitorSchema;
