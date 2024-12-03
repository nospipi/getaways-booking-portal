const mongoose = require("mongoose");
const { Schema } = mongoose;

//------------------------------------------------------------------------

const g4sTrackingSessionCredentialsSchema = new Schema({
  username: String,
  password: String,
  UserIdGuid: String,
  SessionId: String,
});

module.exports = g4sTrackingSessionCredentialsSchema;
