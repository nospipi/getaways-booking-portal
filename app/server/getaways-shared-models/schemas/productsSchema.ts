import { Document, Schema } from "mongoose";

//-----------------------------------------------------------------------------

// Interface for Option
export interface IOption {
  _id: string;
  title: string;
  bokun_code: string;
  is_private: boolean;
  is_guided: boolean;
  pickup_included: boolean;
  requires_vehicle: boolean;
  requires_platform_entry: boolean;
  requires_traveller_details_form: boolean;
  description: string;
  meeting_point_id: string;
}

// Interface for Start Time
export interface IStartTime {
  time_slot: string;
  isDefaultPickupTime: boolean;
  label: string;
  bokun_start_time_id: string;
}

// Interface for Location
export interface ILocation {
  address: string | null;
  latitude: number | null;
  longitude: number | null;
}

// Interface for Product Image
export interface IProductImage {
  file_id: string;
  caption: string;
  alt: string;
  description: string;
}

// Main IProduct Interface
export interface IProduct extends Document {
  _id: string;
  index: number | null;
  title: string | null;
  options: IOption[] | null;
  start_times: IStartTime[] | null;
  platform_product_name: string | null;
  bokun_product_code: string | null;
  location: ILocation;
  meeting_point_id: string | null;
  slug: string | null;
  product_images: string[] | null;
  product_pictures: IProductImage[];
  guide_assignment_identifier: string | null;
  activity_level: string | null;
  additional_info: string[] | null;
  special_instructions: string[] | null;
  highlights: string[];
  product_short_description: string | null;
  product_full_description: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  time_slots: string[] | null;
  time_slots_with_range: IStartTime[] | null;
  pricing_options: string[] | null;
  destinations: string[] | null;
  tour_types: string[] | null;
  tour_duration: string | null;
  tour_duration_type: string | null;
  tour_categories: string[] | null;
  crewGroups: string[] | null;
  crewRoles: string[] | null;
  isPrivate: boolean | null;
  isGuided: boolean | null;
  pickupIncluded: boolean | null;
  review_link: string | null;
  affiliate_link: string | null;
  isPublished: boolean | null;
  market_price: number | null;
  isAvailableInPlan: boolean | null;
  suggested_products: string[] | null;
  isCompleted: boolean | null;
}

//-----------------------------------------------------------------------------

const productsSchema = new Schema<IProduct>(
  {
    index: { type: Number, default: null },
    title: {
      type: String,
      default: null,
    },
    options: {
      type: [
        {
          title: { type: String },
          bokun_code: { type: String },
          is_private: { type: Boolean },
          is_guided: { type: Boolean },
          pickup_included: { type: Boolean },
          requires_vehicle: { type: Boolean },
          requires_platform_entry: { type: Boolean },
          requires_traveller_details_form: { type: Boolean },
          description: { type: String },
          meeting_point_id: { type: String },
        },
      ],
      default: null,
    },
    start_times: {
      type: [
        {
          time_slot: { type: String },
          isDefaultPickupTime: { type: Boolean },
          label: { type: String },
          bokun_start_time_id: { type: String },
        },
      ],
      default: null,
    },
    platform_product_name: {
      type: String,
      default: null,
    },
    bokun_product_code: {
      type: String,
      default: null,
    },
    location: {
      type: {
        address: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
      },
      default: {
        address: null,
        latitude: null,
        longitude: null,
      },
    },
    meeting_point_id: { type: String, default: null },
    slug: { type: String, default: null },
    product_images: { type: [String], default: null },
    product_pictures: {
      type: [
        {
          file_id: { type: String },
          caption: { type: String },
          alt: { type: String },
          description: { type: String },
        },
      ],
      default: null,
    },
    guide_assignment_identifier: { type: String, default: null },
    activity_level: { type: String, default: null },
    additional_info: { type: [String], default: null },
    special_instructions: { type: [String], default: null },
    highlights: { type: [String], default: null },
    product_short_description: { type: String, default: null },
    product_full_description: { type: String, default: null },
    inclusions: { type: [String], default: null },
    exclusions: { type: [String], default: null },
    time_slots: { type: [String], default: null },
    time_slots_with_range: {
      type: [
        {
          time_slot: { type: String },
          isDefaultPickupTime: { type: Boolean },
          label: { type: String },
          bokun_start_time_id: { type: String },
        },
      ],
      default: null,
    },
    pricing_options: { type: [String], default: null },
    destinations: { type: [String], default: null },
    tour_types: { type: [String], default: null },
    tour_duration: { type: String, default: null },
    tour_duration_type: { type: String, default: null },
    tour_categories: { type: [String], default: null },
    crewGroups: { type: [String], default: null },
    crewRoles: { type: [String], default: null },
    isPrivate: { type: Boolean, default: null },
    isGuided: { type: Boolean, default: null },
    pickupIncluded: { type: Boolean, default: null },
    review_link: { type: String, default: null },
    affiliate_link: { type: String, default: null },
    isPublished: { type: Boolean, default: null },
    market_price: { type: Number, default: null },
    isAvailableInPlan: { type: Boolean, default: null },
    suggested_products: { type: [String], default: null },
    isCompleted: { type: Boolean, default: null },
  },
  {
    minimize: false,
  }
);

//-----------------------------------------------------------------------------

export default productsSchema;
