import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------

export interface ITaskGuest {
  name: string;
  count: number;
}

export interface IPickup {
  meeting_point: string;
  time: string;
  details: string;
  lat: string;
  lon: string;
  guests: ITaskGuest[];
}

export interface ITask extends Document {
  product: string;
  option_id: string;
  date: string;
  assignees: unknown[];
  vehicle_id: string | null;
  pickups: IPickup[];
  details: string;
  tour_group_id: string;
  author_id: string;
}

//------------------------------------------------------------------------

const taskGuestSchema = new Schema<ITaskGuest>({
  name: { type: String, default: "" },
  count: { type: Number, default: 1 },
});

const pickupSchema = new Schema<IPickup>({
  meeting_point: String,
  time: String,
  details: String,
  lat: String,
  lon: String,
  guests: [taskGuestSchema],
});

const taskSchema = new Schema<ITask>(
  {
    product: { type: String, required: true },
    option_id: { type: String, required: true },
    date: { type: String, required: true },
    assignees: Array,
    vehicle_id: { type: String, default: null },
    pickups: [pickupSchema],
    details: String,
    tour_group_id: String,
    author_id: { type: String, required: true },
  },
  {
    minimize: false,
    //allows to save empty objects in db
  }
);

taskSchema.plugin(mongoosePaginate);
taskSchema.plugin(mongooseAggregatePaginate);

export default taskSchema;
