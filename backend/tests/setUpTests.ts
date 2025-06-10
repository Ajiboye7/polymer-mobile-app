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
    console.log("Test user created:", user); // Debug: Confirm user creation
  } catch (error) {
    console.error("Failed to create test user:", error); // Debug: Log any errors
    throw error; // Fail the test if user creation fails
  }

  // Debug: Verify the user exists in the database
  const savedUser = await User.findOne({ email: "john@example.com" });
  console.log("Saved user in database:", savedUser);
});