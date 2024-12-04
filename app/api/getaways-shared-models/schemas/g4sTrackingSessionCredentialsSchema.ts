import { Schema, Document } from "mongoose";

//------------------------------------------------------------------------

export interface IG4STrackingSessionCredentials extends Document {
  username?: string;
  password?: string;
  UserIdGuid?: string;
  SessionId?: string;
}

//------------------------------------------------------------------------

const g4sTrackingSessionCredentialsSchema =
  new Schema<IG4STrackingSessionCredentials>({
    username: { type: String },
    password: { type: String },
    UserIdGuid: { type: String },
    SessionId: { type: String },
  });

export default g4sTrackingSessionCredentialsSchema;
