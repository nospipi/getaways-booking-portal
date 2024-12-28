import mongoose, { connect } from "mongoose";
mongoose.set("strictQuery", true);
const ENV = process.env.ENV;

const MONGODB_URI =
  ENV === "PRODUCTION"
    ? process.env.MONGO_CONNECTION_PROD
    : process.env.MONGO_CONNECTION_DEV;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  //throw new Error("Test error mongodb connection"); //simulate error

  if (cached.conn) {
    console.log(`🚀 Using cached mongodb connection (${ENV})`);
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log(`✅ New connection to mongodb established (${ENV})`);
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connection to mongodb database failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
