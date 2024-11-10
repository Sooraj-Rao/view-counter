"use server";
import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export const ConnectDb = async () => {
  if (cachedConnection) {
    console.log("Using Cached DB connection");
    return cachedConnection;
  }
  const uri = process.env.MONGO_URI!;

  try {
    const conn = await mongoose.connect(uri);
    cachedConnection = conn.connection;
    console.log("Database connected");
    return cachedConnection;
  } catch (error) {
    return console.log("Database connection failed -->", error);
  }
};

/*{
  import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
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
}*/


