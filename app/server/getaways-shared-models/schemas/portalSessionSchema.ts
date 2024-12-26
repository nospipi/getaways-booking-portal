import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------------

export interface IUserAction extends Document {
  date_time: Date;
  device_info: {
    platform: string;
    osName: string;
    osVersion: string;
    browserName: string;
    browserVersion: string;
    mobileVendor: string;
    mobileModel: string;
  };
  user_action:
    | "SCROLLED_TO_BOTTOM"
    | "REVIEW_LINK_CLICK"
    | "PROMO_PRODUCT_CLICK"
    | "SIM_LINK_CLICK"
    | "ADDED_LOCATION"
    | "CONFIRMED_INSTRUCTIONS"
    | "BUS_TRACKING_MAP_CLICK"
    | "NAVIGATION_LINK_CLICK"
    | "CONTACT_BUTTON_CLICK";
}

export interface IPortalSession extends Document {
  date_time: Date;
  booking_ref: string;
  booking_date: string;
  client_name: string;
  client_phone: string;
  product_title: string;
  session_actions: IUserAction[];
}

//------------------------------------------------------------------------------

const portalUserActionSchema = new Schema<IUserAction>({
  date_time: { type: Date, default: Date.now },
  device_info: Object,
  user_action: String,
});

const portalUserSessionSchema = new Schema<IPortalSession>({
  booking_ref: String,
  booking_date: String,
  client_name: String,
  client_phone: String,
  product_title: String,
  session_actions: { type: [portalUserActionSchema], default: [] },
});

portalUserSessionSchema.plugin(mongoosePaginate);
portalUserSessionSchema.plugin(mongooseAggregatePaginate);

export default portalUserSessionSchema;
