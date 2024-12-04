import { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

//--------------------------------------------------------------------------

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  mobileLogStatus: boolean;
  loggedDevices: unknown[];
  groups: unknown[];
  roles: unknown[];
  contact: {
    tel: string;
    email: string;
  };
  id_number: string;
  afm_number: string;
  amka_number: string;
  driver_license_number: string;
  guide_reg_number: string;
  web_app_user_preferences: {
    notifications: {
      shown: {
        new_booking: boolean;
        booking_changed_date: boolean;
        booking_cancelled: boolean;
        client_confirmed: boolean;
        client_updated_location: boolean;
      };
    };
  };
  isAdmin: boolean;
  isModerator: boolean;
  onOfficeDuty: boolean;
  isEmergencyContact: boolean;
  permissions: object;
  shouldReceiveAnnouncements: boolean;
}

//--------------------------------------------------------------------------

const userSchema = new Schema<IUser>(
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
  }
);

userSchema.plugin(uniqueValidator, {
  message: "{PATH} {VALUE} already exists.",
});

export default userSchema;
