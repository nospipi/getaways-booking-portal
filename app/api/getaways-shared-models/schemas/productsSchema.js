const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");

//-----------------------------------------------------------------------------

const productsSchema = new Schema(
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
          url: { type: String },
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
    isCompleted: { type: Boolean, default: null },
  },
  {
    minimize: false,
  }
);

productsSchema.pre("save", function (next) {
  if (this.platform_product_name) {
    this.slug = _.kebabCase(this.platform_product_name);
  }
  next();
});

productsSchema.pre("findByIdAndUpdate", async function (next) {
  if (this.platform_product_name) {
    this.slug = _.kebabCase(this.platform_product_name);
  }
  next();
});

module.exports = productsSchema;
