import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//------------------------------------------------------------------------

export interface IVehicleServiceLogEntry extends Document {
  vehicle_id: string;
  assignee: string;
  workshop: string;
  date: string;
  odometer: string;
  cost: string;
  repairs: string[];
  notes?: string;
}

//------------------------------------------------------------------------

const vehicleServiceLogEntrySchema = new Schema<IVehicleServiceLogEntry>({
  vehicle_id: String,
  assignee: String,
  workshop: String,
  date: String,
  odometer: String,
  cost: String,
  repairs: [String],
  notes: String,
});

vehicleServiceLogEntrySchema.plugin(mongoosePaginate);

export default vehicleServiceLogEntrySchema;
