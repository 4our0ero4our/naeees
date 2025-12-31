import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

// CACHE THE CONNECTION TO AVOID MULTIPLE CONNECTIONS
let cached = (global as any).mongoose;

// CACHE THE CONNECTION
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

/**
 * Connect to the database
 * @returns the connection to the database
 * @throws {Error} if the database is not connected, throws an error if the database is not connected, throws an error if the database is not connected
 */
export async function connectDB() {
    // IF THE CONNECTION IS ALREADY CACHED, RETURN IT
  if (cached.conn) return cached.conn;

  // IF THE CONNECTION IS NOT CACHED, CONNECT TO THE DATABASE
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  // SET THE CONNECTION TO THE CACHED CONNECTION
  cached.conn = await cached.promise;
  return cached.conn;
}
