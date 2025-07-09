
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { sendOtpEmail, generateOTP } from "../src/utils/send-otp";
jest.setTimeout(60000);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  try {
    console.log("Starting MongoDB memory server...");
    mongoServer = await MongoMemoryServer.create({
      instance: { dbName: "testdb" },
    });
    const uri = mongoServer.getUri();
    console.log(`MongoDB memory server started at: ${uri}`);

    // Store mongoServer globally for reconnection
    (global as any).__MONGO_SERVER__ = mongoServer;

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log("Mongoose connected to MongoDB.");
  } catch (error) {
    console.error("Failed to start MongoDB memory server or connect Mongoose:", error);
    throw error; // Fail tests if setup fails
  }
});

afterAll(async () => {
  try {
    console.log("Closing Mongoose connection...");
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
      console.log("MongoDB memory server stopped.");
    }
  } catch (error) {
    console.error("Failed to stop MongoDB memory server or close Mongoose:", error);
  }
});

beforeEach(async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.warn("Mongoose is not connected. Attempting to reconnect...");
      const uri = mongoServer.getUri();
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
      });
      console.log("Mongoose reconnected to MongoDB.");
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not established.");
    }

    const collections = await db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    console.log("Database collections cleared.");
  } catch (error) {
    console.error("Failed to clear database collections:", error);
    throw error; // Fail tests if setup fails
  }
});
