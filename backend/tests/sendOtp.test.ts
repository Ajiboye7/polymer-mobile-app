/*import request from "supertest";
import app from "../src/app";
import User from "../src/models/UserModels";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config/env";
import { response } from "express";
import { sendOtpEmail } from "../src/utils/send-otp";

jest.mock("jsonwebtoken");
jest.mock("../src/config/env.ts", () => ({
  JWT_SECRET: "test-secret",
}));

interface SignUpBody {
  name: string;
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

describe("user controller test", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.spyOn(require("../src/config/env"), "JWT_SECRET", "get").mockReturnValue("test-secret")
  });

  describe("sign controller test", () => {
    const validSignUpBody: SignUpBody = {
      name: "John Doe",
      account: " 1234567890",
      email: "john@example.com",
      password: "password123!",
      confirmPassword: "password123!",
    };

    test("should sign up user successfully with token", async () => {
      (Jwt.sign as jest.Mock).mockReturnValue("mocked-token");

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(validSignUpBody);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "User created successfully. OTP sent to email."
      );
      expect(response.body.data.user).toEqual({
        _id: "123",
        name: "Test User",
        account: "1234567890",
        email: "test@example.com",
        token: expect.any(String),
      });
      expect(Jwt.sign).toHaveBeenCalledWith(
        { _id: expect.any(String) },
        "test-secret",
        { expiresIn: "1h" }
      );

      expect(sendOtpEmail).toHaveBeenCalledWith({
        email: "john@example.com",
        otp: "123456",
      });

      const user = await User.findOne({ email: "john@example.com" });
      expect(user).toBeDefined();
      expect(user?.name).toBe("John Doe");
      expect(user?.account).toBe("1234567890");
      expect(user?.isVerified).toBe(false);
      expect(user?.otp).toBe("123456");
      expect(user?.balance).toBe(113000);
    });

    test("should return 404 for clients", async ()=>{
      test.each([
      ["All fields are to be filled", { ...validSignUpBody, name: "" }],
      ["Passwords do not match", { ...validSignUpBody, confirmPassword: "Different123!" }],
      ["Please enter a valid email", { ...validSignUpBody, email: "invalid-email" }],
      ["Account number already exists", { ...validSignUpBody }],
      ["Password not strong enough", { ...validSignUpBody, password: "weak", confirmPassword: "weak" }],
      ["Email already exists", { ...validSignUpBody }],
    ])

     ("should return 400 for client error: %s", async (errorMessage: string, body: SignUpBody) => {
          // Pre-create a user for duplicate account/email tests
          if (errorMessage === "Account number already exists" || errorMessage === "Email already exists") {
            await request(app).post("/api/auth/sign-up").send(validSignUpBody).expect(201);
          }
    
          const response = await request(app)
           .post("/api/auth/sign-up")
            .send(body)
            .expect(400);
    
          expect(response.body).toEqual({
            success: false,
            message: errorMessage,
          });
        });

    })

    test("should return 404 for failed OTP email", async ()=>{
      (sendOtpEmail as jest.Mock).mockRejectedValue(new Error("Email send failed"))

      const response = await request(app).post("/api/auth/sign-up").send(validSignUpBody)
      .expect(400)

      expect(response.body).toEqual({
         success: false,
        message: "Failed to send OTP email. Please try again.",
      })
    })
  });
});
*/

jest.mock("jsonwebtoken");
jest.mock("../src/config/env", () => ({
  JWT_SECRET: "test-secret",
}));

jest.mock("../src/utils/send-otp", () => ({
  sendOtpEmail: jest.fn().mockResolvedValue(true),
  generateOTP: jest.fn().mockReturnValue(123456),
}));

import request from "supertest";
import app from "../src/app"; // Adjust path to your Express app
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../src/utils/send-otp";
import User from "../src/models/UserModels";
import { MongoMemoryServer } from "mongodb-memory-server";


interface SignUpBody {
  name: string;
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}


interface SignInBody {
  email: string;
  password: string;
}


describe("User Controller Integration Tests", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/sign-up", () => {

    
    
    const validSignUpBody: SignUpBody = {
      name: "John Doe",
      account: "1234567890",
      email: "john@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    };

    const invalidFieldTests: [keyof SignUpBody, string | null | undefined][] = [
    ["name", ""],
    ["name", "   "],
    ["name", null],
    ["name", undefined],
    ["account", ""],
    ["account", "   "],
    ["account", null],
    ["account", undefined],
    ["email", ""],
    ["email", "   "],
    ["email", null],
    ["email", undefined],
    ["password", ""],
    ["password", "   "],
    ["password", null],
    ["password", undefined],
    ["confirmPassword", ""],
    ["confirmPassword", "   "],
    ["confirmPassword", null],
    ["confirmPassword", undefined],
  ];

    test("should sign up a user successfully and return a token", async () => {
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token-123");

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(validSignUpBody)
        .expect(201);
      console.log("sign up response", response);
      expect(response.body.data.user.token).toBe("mocked-token-123");

      expect(response.body).toEqual({
        success: true,
        message: "User created successfully. OTP sent to email.",
        data: {
          user: {
            _id: expect.any(String),
            name: "John Doe",
            account: "1234567890",
            email: "john@example.com",
           token: "mocked-token-123",
          },
        },
      });

      /*expect(sendOtpEmail).toHaveBeenCalledWith({
        email: "john@example.com",
        otp: "123456",
      });*/

      // Verify user in database
      /*const user = await User.findOne({ email: "john@example.com" });
      expect(user).toBeDefined();
      expect(user?.name).toBe("John Doe");
      expect(user?.account).toBe("1234567890");
      expect(user?.email).toBe("john@example.com")
      expect(user?.isVerified).toBe(false);
      expect(user?.otp).toBe("123456");
      expect(user?.balance).toBe(113000);*/
    });

    

    test.each(invalidFieldTests)(
    "should return 400 for invalid %s",
    async (field: keyof SignUpBody, invalidValue: string | null | undefined) => {
      const body: SignUpBody = { ...validSignUpBody, [field]: invalidValue };
      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(body);
      //console.log(`Sign-up error response for ${field}=${JSON.stringify(invalidValue)}:`, JSON.stringify(response.body, null, 2));
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: "All fields are to be filled",
      });
    }
  );

  test.each([
    ["Passwords do not match", { ...validSignUpBody, confirmPassword: "Different123!" }],
    ["Please enter a valid email", { ...validSignUpBody, email: "invalid-email" }],
    ["Password not strong enough", { ...validSignUpBody, password: "weak", confirmPassword: "weak" }],
    ["Account number already exists", { ...validSignUpBody }],
    ["Email already exists", { ...validSignUpBody, account: "123476890" }],
  ])(
    "should return 400 for client error: %s",
    async (errorMessage: string, body: SignUpBody) => {
      // Pre-create a user for duplicate account/email tests
      if (
        errorMessage === "Account number already exists" ||
        errorMessage === "Email already exists"
      ) {
        await request(app)
          .post("/api/auth/sign-up")
          .send(validSignUpBody)
          .expect(201);
      }

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(body);
      console.log("Sign-up error response:", JSON.stringify(response.body, null, 2));
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: errorMessage,
      });
    }
  );
    test("should return 400 for failed OTP email", async () => {
      (sendOtpEmail as jest.Mock).mockRejectedValueOnce(
        new Error("Email send failed")
      );

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(validSignUpBody)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: "Failed to send OTP email. Please try again.",
      });
    });

    test("should return 500 for unexpected server error", async () => {
      // Temporarily break MongoDB connection to simulate a server error
      await mongoose.connection.close();

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(validSignUpBody)
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "An unexpected error occurred during registration",
      });

      // Reconnect for subsequent tests
      const mongoServer = (global as any).__MONGO_SERVER__;
      if (mongoServer) {
        await mongoose.connect(mongoServer.getUri(), {
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 30000,
          connectTimeoutMS: 30000,
        });
      } else {
        throw new Error(
          "MongoMemoryServer instance not available for reconnection."
        );
      }
    });

    test("should return 500 if JWT_SECRET is not defined", async () => {
      
      jest.requireMock("../src/config/env").JWT_SECRET = undefined;

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(validSignUpBody)
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "An unexpected error occurred during registration",
      });

      
    });
  });
  

  describe("POST /api/auth/sign-in", () => {
    const validSignUpBody: SignUpBody = {
      name: "John Doe",
      account: "1234567890",
      email: "john@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    };
    const validSignInBody: SignInBody = {
      email: "john@example.com",
      password: "Password123!",
    };

    beforeEach(async () => {
      
      jest.clearAllMocks();
      jest.requireMock("../src/config/env").JWT_SECRET = 'test-secret';
      await request(app).post("/api/auth/sign-up").send(validSignUpBody);

      //.expect(201);
      await User.updateOne({ email: "john@example.com" }, { isVerified: true });
    });

    

    test("should sign in a verified user successfully and return a token", async () => {
      
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token-123");

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(validSignInBody)
        .expect(200);
      console.log("this is response", response.body);

      expect(response.body.data.user.token).toBe("mocked-token-123");

      expect(response.body).toEqual({
        success: true,
        message: "Login successful",
        data: {
          user: {
            _id: expect.any(String),
            name: "John Doe",
            account: "1234567890",
            email: "john@example.com",
            token: "mocked-token-123",
            pinSet: expect.any(Boolean),
            isVerified: true,
            //identityNumber: expect.any(String),
            //identityType: expect.any(String),
          },
        },
      });

      /*expect(jwt.sign).toHaveBeenCalledWith(
        { _id: expect.any(String) },
        "test-secret",
        { expiresIn: "1h" }
      );*/
    });

    
    test("should return 403 if user is not verified", async () => {
      await User.updateOne(
        { email: "john@example.com" },
        { isVerified: false }
      );

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(validSignInBody)
        .expect(403);

      expect(response.body).toEqual({
        success: false,
        message: "Account not verified. Please try add pin and confirm pin to get verified.",
      });
    });

    test.each([
      ["email and password required", { email: "", password: "Password123!" }],
      [
        "Please enter a valid email",
        { email: "invalid-email", password: "Password123!" },
      ],
      [
        "Incorrect Credentials",
        { email: "john@example.com", password: "WrongPassword123!" },
      ],
      [
        "Incorrect Credentials",
        { email: "nonexistent@example.com", password: "Password123!" },
      ],
    ])(
      "should return 400 for client error: %s",
      async (errorMessage: string, body: SignInBody) => {
        const response = await request(app)
          .post("/api/auth/sign-in")
          .send(body)
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          message: errorMessage,
        });
      }
    );

    test("should return 500 for unexpected server error", async () => {
      await mongoose.connection.close();

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(validSignInBody)
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "An unexpected error occurred during login",
      });

      const mongoServer = (global as any).__MONGO_SERVER__;
      if (mongoServer) {
        await mongoose.connect(mongoServer.getUri(), {
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 30000,
          connectTimeoutMS: 30000,
        });
      } else {
        throw new Error(
          "MongoMemoryServer instance not available for reconnection."
        );
      }
    });

    test("should return 500 if JWT_SECRET is not defined", async () => {
      // Override the mock for this test
      jest.requireMock("../src/config/env").JWT_SECRET = undefined;

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(validSignInBody)
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "An unexpected error occurred during login",
      });
    });
  });
});
