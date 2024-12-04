import { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

//--------------------------------------------------------------------------

export interface IVehicle extends Document {
  plate: string;
  type: string;
  max_capacity?: number;
  color: string;
  gps_tracker_uid?: string;
  position: {
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    updated_at: Date;
  };
  upcoming_scheduled_service: {
    date: string;
    time: string;
    workshop: string;
    planned_repairs: string[];
  }[];
  platform_entry_required: boolean;
}

//--------------------------------------------------------------------------

const vehicleSchema = new Schema<IVehicle>({
  plate: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  type: {
    type: String,
    required: true,
  },
  max_capacity: Number,
  color: {
    type: String,
    required: true,
  },
  gps_tracker_uid: String,
  position: {
    latitude: Number,
    longitude: Number,
    speed: Number,
    heading: Number,
    updated_at: Date,
  },
  upcoming_scheduled_service: {
    type: [
      {
        date: String,
        time: String,
        workshop: String,
        planned_repairs: [String],
      },
    ],
    default: [],
  },
  platform_entry_required: {
    type: Boolean,
    required: true,
  },
});

vehicleSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

export default vehicleSchema;
