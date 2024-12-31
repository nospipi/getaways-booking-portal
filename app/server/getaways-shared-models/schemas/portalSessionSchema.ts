import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------------

export interface IPortalAction extends Document {
  date_time: Date;
  platform: string;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  mobileVendor: string;
  mobileModel: string;
  user_action:
    | "PAGE_VISIT"
    | "PAGE_LEAVE"
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

export interface IPortalSessionBooking {
  unique_booking_id: string;
  booking_date: string;
  client_name: string;
  product_title: string;
}

export interface IPortalSession extends Document {
  booking_ref: string;
  bookings: IPortalSessionBooking[];
  has_scrolled_to_bottom: boolean;
  has_clicked_review_link: boolean;
  has_clicked_promo_product: boolean;
  has_clicked_sim_link: boolean;
  has_added_location: boolean;
  has_confirmed_instructions: boolean;
  has_clicked_bus_tracking_map: boolean;
  has_clicked_navigation_link: boolean;
  has_clicked_contact_button: boolean;
  session_actions: IPortalAction[];
}

//------------------------------------------------------------------------------

const portalActionSchema = new Schema<IPortalAction>({
  date_time: { type: Date, default: Date.now },
  platform: String,
  osName: String,
  osVersion: String,
  browserName: String,
  browserVersion: String,
  mobileVendor: String,
  mobileModel: String,
  user_action: String,
});

const portalSessionBookingSchema = new Schema<IPortalSessionBooking>({
  unique_booking_id: { type: String, required: true },
  booking_date: { type: String, required: true },
  client_name: { type: String, required: true },
  product_title: { type: String, required: true },
});

const portalSessionSchema = new Schema<IPortalSession>({
  booking_ref: { type: String, required: true },
  bookings: { type: [portalSessionBookingSchema], default: [] },
  has_scrolled_to_bottom: { type: Boolean, default: false },
  has_clicked_review_link: { type: Boolean, default: false },
  has_clicked_promo_product: { type: Boolean, default: false },
  has_clicked_sim_link: { type: Boolean, default: false },
  has_added_location: { type: Boolean, default: false },
  has_confirmed_instructions: { type: Boolean, default: false },
  has_clicked_bus_tracking_map: { type: Boolean, default: false },
  has_clicked_navigation_link: { type: Boolean, default: false },
  has_clicked_contact_button: { type: Boolean, default: false },
  session_actions: { type: [portalActionSchema], default: [] },
});

portalSessionSchema.plugin(mongoosePaginate);
portalSessionSchema.plugin(mongooseAggregatePaginate);

export default portalSessionSchema;
