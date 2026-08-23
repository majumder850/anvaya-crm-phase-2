const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing active database connection");
    return;
  }

  if (!mongoUri) {
    console.error("process.env.MONGODB is undefined!");
    throw new Error("Database URI missing. Check Environment Variables.");
  }

  try {
    console.log("Establishing database connection...");
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
    throw error;
  }
};

module.exports = { initializeDatabase };
