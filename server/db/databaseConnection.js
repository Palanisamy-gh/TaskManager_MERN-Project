import mongoose from "mongoose";

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected!");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
};

export default databaseConnection;
