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

let mongoServer: MongoMemoryServer;

// Increase timeout for all hooks and tests
jest.setTimeout(60000); // 30 seconds

beforeAll(async () => {
  console.log("Starting MongoDB memory server...");
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: "testdb",
    },
  });

  const uri = mongoServer.getUri();
  console.log(`MongoDB memory server started at: ${uri}`);

  console.log("Connecting Mongoose to MongoDB...");
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  });
  console.log("Mongoose connected to MongoDB.");
});

afterAll(async () => {
  console.log("Closing Mongoose connection...");
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log("Mongoose connection closed.");
  }

  console.log("Stopping MongoDB memory server...");
  if (mongoServer) {
    await mongoServer.stop();
    console.log("MongoDB memory server stopped.");
  }
});