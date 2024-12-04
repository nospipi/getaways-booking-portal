import { Schema } from "mongoose";

//-------------------------------------------------------------------------

export interface IPwaPushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

const PwaPushSubscriptionSchema = new Schema<IPwaPushSubscription>({
  endpoint: { type: String },
  keys: {
    p256dh: { type: String },
    auth: { type: String },
  },
});

export default PwaPushSubscriptionSchema;
