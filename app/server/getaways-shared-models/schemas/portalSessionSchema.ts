import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------------

export interface IPortalAction extends Document {
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
  session_actions: IPortalAction[];
}

//------------------------------------------------------------------------------

const portalActionSchema = new Schema<IPortalAction>({
  date_time: { type: Date, default: Date.now },
  device_info: Object,
  user_action: String,
});

const portalSessionSchema = new Schema<IPortalSession>({
  booking_ref: String,
  booking_date: String,
  client_name: String,
  client_phone: String,
  product_title: String,
  session_actions: { type: [portalActionSchema], default: [] },
});

portalSessionSchema.plugin(mongoosePaginate);
portalSessionSchema.plugin(mongooseAggregatePaginate);

export default portalSessionSchema;
