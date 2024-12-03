const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

//--------------------------------------------------------------------------

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
      match: [/^\S*$/, "Username cannot contain spaces"],
    },
    password: {
      type: String,
      required: true,
    },
    mobileLogStatus: {
      type: Boolean,
      default: false,
    },
    loggedDevices: Array,
    groups: {
      type: Array,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
    },
    contact: {
      tel: String,
      email: String,
    },
    id_number: String,
    afm_number: String,
    amka_number: String,
    driver_license_number: String,
    guide_reg_number: String,
    web_app_user_preferences: {
      notifications: {
        type: Object,
        default: {
          shown: {
            new_booking: true,
            booking_changed_date: true,
            booking_cancelled: true,
            client_confirmed: true,
            client_updated_location: true,
          },
        },
      },
    },
    isAdmin: Boolean,
    isModerator: Boolean,
    onOfficeDuty: Boolean,
    isEmergencyContact: Boolean,
    permissions: Object,
    shouldReceiveAnnouncements: Boolean,
  },
  {
    minimize: false,
    //allows to save empty objects in db
  }
);
userSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

module.exports = userSchema;
