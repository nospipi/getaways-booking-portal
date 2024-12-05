import { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//--------------------------------------------------------------------------

export interface ITourGroup extends Document {
  product_id: string;
  product: string;
  option_id: string;
  temp_option_id: string;
  start_time_id: string;
  temp_start_time_id: string;
  date: string;
  time: string;
  bookings: Schema.Types.ObjectId[]; // Need to be populated
  task_id: string;
  notes: string;
  notes_list: unknown[];
  visible_in_planner: boolean;
  guide_id: string;
  guide_uds_id: string;
  guide_confirmation: string;
  guide_details: string;
  guides_asked: unknown[];
  guide_email_sent: boolean;
  vehicle_id: string;
  index: number;
  vehicle_platform_entry: string;
}

//--------------------------------------------------------------------------

const tourGroupSchema = new Schema<ITourGroup>({
  product_id: String,
  product: String,
  option_id: String,
  temp_option_id: String,
  start_time_id: String,
  temp_start_time_id: String,
  date: String,
  time: String,
  bookings: [{ type: Schema.Types.ObjectId, ref: "booking" }], //need to be populated
  task_id: String,
  notes: String,
  notes_list: { type: Array, default: [] }, // -
  visible_in_planner: { type: Boolean, default: true },
  guide_id: String,
  guide_uds_id: String,
  guide_confirmation: String,
  guide_details: String,
  guides_asked: Array,
  guide_email_sent: Boolean,
  vehicle_id: String,
  index: {
    type: Number,
    default: 1,
  },
  vehicle_platform_entry: String,
});

//TODO temporary //unset product when is fixed in all apps
tourGroupSchema.pre("save", function (next) {
  if (this.product_id && !this.product) {
    this.product = this.product_id;
  }
  next();
});

tourGroupSchema.plugin(mongoosePaginate);
tourGroupSchema.plugin(mongooseAggregatePaginate);

export default tourGroupSchema;
