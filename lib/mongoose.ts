import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;
export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.NEXT_PUBLIC_MONGO_URI) {
    console.log("Mongo uri is not defined");
  }

  if (isConnected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      appName: "twitter-x",
      autoCreate: true,
    };
    const url = String(process.env.NEXT_PUBLIC_MONGO_URI);
    await mongoose.connect(url, options);
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }
};
