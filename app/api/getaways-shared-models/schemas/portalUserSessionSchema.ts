import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------------

export interface IUserAction extends Document {
  date_time: Date;
  user_action: string;
}

export interface IUserSession extends Document {
  date_time: Date;
  booking_ref: string;
  booking_date: string;
  client_name: string;
  client_phone: string;
  product_title: string;
  session_actions: IUserAction[];
  device_info: object;
  sessionDurationInSeconds: number;
}

//------------------------------------------------------------------------------

const portalUserActionSchema = new Schema<IUserAction>({
  date_time: { type: Date, default: Date.now },
  user_action: String,
});

// Schema for portal user sessions
const portalUserSessionSchema = new Schema<IUserSession>({
  date_time: { type: Date, default: Date.now },
  booking_ref: String,
  booking_date: String,
  client_name: String,
  client_phone: String,
  product_title: String,
  session_actions: { type: [portalUserActionSchema], default: [] },
  device_info: Object,
  sessionDurationInSeconds: Number,
});

// Indexes for performance improvements
portalUserSessionSchema.index({ date_time: -1 }); // Add index for date_time sorting --> used in bookings/offline_paginated/:page
// Add index for session_actions.user_action (particularly targeting last element in array) --> used in bookings/offline_paginated/:page
portalUserSessionSchema.index({ "session_actions.user_action": 1 });
// Add index for booking_ref (used in $group) --> used in bookings/offline_paginated/:page
portalUserSessionSchema.index({ booking_ref: 1 });
// Add compound index for date_time and session_actions.user_action, since they are used together --> used in bookings/offline_paginated/:page
portalUserSessionSchema.index({
  date_time: -1,
  "session_actions.user_action": 1,
});

portalUserSessionSchema.plugin(mongoosePaginate);
portalUserSessionSchema.plugin(mongooseAggregatePaginate);

export default portalUserSessionSchema;
