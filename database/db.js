import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", "false");
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
