import mongoose from "mongoose";

/////////////////////// Setup node app and mongoose connectivity.//////////////////////////////////////
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
