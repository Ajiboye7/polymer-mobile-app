/*import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

// Global setup for tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // Start MongoDB memory server
  const uri = mongoServer.getUri();
  await mongoose.connect(uri); // Connect to the in-memory database
});

// Global teardown for tests
afterAll(async () => {
  await mongoose.connection.close(); // Close the database connection
  await mongoServer.stop(); // Stop the MongoDB memory server
});*/

/*import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

// Increase timeout for beforeAll
beforeAll(async () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds
  mongoServer = await MongoMemoryServer.create(); // Start MongoDB memory server
  const uri = mongoServer.getUri();
  await mongoose.connect(uri); // Connect to the in-memory database
}, 30000); // Increase timeout for beforeAll hook

// Increase timeout for afterAll
afterAll(async () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds
  await mongoose.connection.close(); // Close the database connection
  await mongoServer.stop(); // Stop the MongoDB memory server
}, 30000); // Increase timeout for afterAll hook*/

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../src/models/UserModels";
import { sendOtpEmail } from "../src/utils/send-otp";


// Mock sendOtpEmail to avoid actual email sending during tests
jest.mock("../src/utils/send-otp", () => ({
  sendOtpEmail: jest.fn().mockResolvedValue(true),
  generateOTP: jest.requireActual("../src/utils/send-otp").generateOTP,
}));
jest.setTimeout(60000);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  console.log("Starting MongoDB memory server...");
  mongoServer = await MongoMemoryServer.create({
    instance: { dbName: "testdb" },
  });
  const uri = mongoServer.getUri();
  console.log(`MongoDB memory server started at: ${uri}`);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  });
  console.log("Mongoose connected to MongoDB.");
});

afterAll(async () => {
  console.log("Closing Mongoose connection...");
  await mongoose.connection.close();
  if (mongoServer) {
    await mongoServer.stop();
    console.log("MongoDB memory server stopped.");
  }
});

beforeEach(async () => {
  await User.deleteMany({}); // Clear the database before each test

  // Create a test user for signIn tests
  try {
    const user = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
    console.log("Test user created:", user);
  } catch (error) {
    console.error("Failed to create test user:", error);
    throw error;
  }

  const savedUser = await User.findOne({ email: "john@example.com" });
  console.log("Saved user in database:", savedUser);
});