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
