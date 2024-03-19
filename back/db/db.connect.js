require("dotenv").config()
const mongoose = require("mongoose")

const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToDb
