const mongoose = require("mongoose");

const DATABASE_URL = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

const connectToDatabase = async () => {
  try {
    const databaseConnection = await mongoose.connect(DATABASE_URL);
    console.log("Database connection successful");
    return databaseConnection;
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectToDatabase;
