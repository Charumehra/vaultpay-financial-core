import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Connecting to MongoDB...");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;