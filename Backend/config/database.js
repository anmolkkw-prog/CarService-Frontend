const mongoose = require("mongoose");

/**
 * Establishes a connection to the MongoDB database.
 */
const connectDB = async () => {
    try {
        const connStr =
            process.env.MONGO_URI ||
            "mongodb://127.0.0.1:27017/my_database";

        const conn = await mongoose.connect(connStr);

        console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection error:`);
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;