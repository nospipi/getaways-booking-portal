import { Document, Schema } from "mongoose";

//------------------------------------------------------------------------

export interface IAppVersion extends Document {
  version: string;
  date: Date;
  release_notes: string;
  shouldBeForcedUpdate: boolean;
  ios?: boolean;
  android?: boolean;
}

//------------------------------------------------------------------------

const appVersionSchema = new Schema<IAppVersion>({
  version: { type: String, required: true },
  date: { type: Date, default: Date.now },
  release_notes: { type: String, required: true },
  shouldBeForcedUpdate: { type: Boolean, required: true },
  ios: { type: Boolean },
  android: { type: Boolean },
});

//------------------------------------------------------------------------

export default appVersionSchema;
