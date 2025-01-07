import { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------------

export type UserActionType =
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

export interface UserActionData {
  clickedPromoProductId?: string;
}

export interface IPortalAction extends Document {
  date_time: Date;
  platform: string;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  mobileVendor: string;
  mobileModel: string;
  user_action: UserActionType;
  data?: UserActionData;
}

export interface IPortalSession extends Document {
  first_visit_date_time: Date;
  last_action: UserActionType;
  last_action_date_time: Date;
  actions_count: number;
  booking_ref: string;
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

const portalSessionActionDataSchema = new Schema<UserActionData>({
  clickedPromoProductId: String,
});

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
  data: portalSessionActionDataSchema,
});

const portalSessionSchema = new Schema<IPortalSession>({
  first_visit_date_time: { type: Date, default: Date.now },
  last_action: { type: String },
  last_action_date_time: { type: Date, default: Date.now },
  actions_count: { type: Number, default: 0 },
  booking_ref: { type: String, required: true },
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

portalSessionSchema.pre("save", function (next) {
  //update last_action_date_time
  this.last_action_date_time = new Date();
  this.last_action =
    this.session_actions[this.session_actions.length - 1].user_action;
  this.actions_count = this.session_actions.length;

  //handle session actions flags
  this.has_scrolled_to_bottom = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "SCROLLED_TO_BOTTOM"
  );
  this.has_clicked_review_link = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "REVIEW_LINK_CLICK"
  );
  this.has_clicked_promo_product = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "PROMO_PRODUCT_CLICK"
  );
  this.has_clicked_sim_link = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "SIM_LINK_CLICK"
  );
  this.has_added_location = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "ADDED_LOCATION"
  );
  this.has_confirmed_instructions = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "CONFIRMED_INSTRUCTIONS"
  );
  this.has_clicked_bus_tracking_map = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "BUS_TRACKING_MAP_CLICK"
  );
  this.has_clicked_navigation_link = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "NAVIGATION_LINK_CLICK"
  );
  this.has_clicked_contact_button = this.session_actions.some(
    (action: IPortalAction) => action.user_action === "CONTACT_BUTTON_CLICK"
  );

  next();
});

portalSessionSchema.plugin(mongoosePaginate);
portalSessionSchema.plugin(mongooseAggregatePaginate);

export default portalSessionSchema;
