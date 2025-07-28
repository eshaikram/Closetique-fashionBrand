import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('⚠️ MONGODB_URI is not defined in environment variables.');
}
let cached = global.mongoose || { conn: null, promise: null };
export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'clothing-store',
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}