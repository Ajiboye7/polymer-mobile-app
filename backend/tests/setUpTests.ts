

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../src/models/UserModels";
import { sendOtpEmail } from "../src/utils/send-otp"; 


// Mock sendOtpEmail to avoid actual email sending during tests
{/*jest.mock("../src/utils/send-otp", () => ({
  sendOtpEmail: jest.fn().mockResolvedValue(true),
  generateOTP: jest.requireActual("../src/utils/send-otp").generateOTP,
}));*/}

jest.mock("../src/utils/send-otp", () => ({
  sendOtpEmail: jest.fn().mockResolvedValue(true),
  generateOTP: jest.fn().mockReturnValue(123456),
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
  await User.deleteMany({});
});