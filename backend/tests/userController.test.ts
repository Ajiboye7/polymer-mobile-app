{/*import request from "supertest";
import app from "../src/app";
import User from "../src/models/UserModels";

beforeEach(async () => {
    await User.deleteMany(); // Clears database before each test
  });

describe("User Controller", () => {
  test("Should create a new user with token", async () => {
    const res = await request(app).post("/api/auth/sign-up").send({
      name: "John Doe",
      account: "1234567",
      email: "john@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });

    expect(res.body.success).toBe(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.token).toBeDefined();
  });

  test("should not create a new user with with existing email", async () => {
    await request(app).post("/api/auth/sign-up").send({
      name: "John Doe",
      account: "1234567",
      email: "john@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });

    const res = await request(app).post("/api/auth/sign-up").send({
        name: "Jane Doe",
        account: "789012",
        email: "john@gmail.com",
        password: "Test@123",
        confirmPassword: "Test@123",
      });

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe("email already exists")
  });

  test("should log in a user and return  token", async() => {
    await User.signUp("John Doe", "1234567", "john@gmail.com", "Password123!", "Password123!")

    const res = await request(app).post('/api/auth/sign-in').send({
        email:"john@gmail.com",
        password: "Password123!"
    })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.token).toBeDefined()
  })

  test("should not log in a user with account that doesn't exist", async ()=>{
    
    const res = await request(app).post('/api/auth/sign-in').send({
        email: "doesnotexist@gmail.com",
        password:"Password123!"
    })
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe("User does not exist")
  })

 test("should not log in a user with incorrect password", async () => {
  await User.signUp("John Doe", "1234567", "john@gmail.com", "Password123!", "Password123!");

  const res = await request(app).post("/api/auth/sign-in").send({
    email: "john@gmail.com",
    password: "wrongpassword",
  });

  console.log(res.body); // Log response to check if user exists

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Incorrect password");
});


});*/}


import request from "supertest";
import app from "../src/app";
import User from "../src/models/UserModels";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config/env";
import { sendOtpEmail } from "../src/utils/send-otp";
import mongoose from "mongoose";

jest.mock("jsonwebtoken");
jest.mock("../src/config/env", () => ({
  JWT_SECRET: "test-secret",
}));

interface SignUpBody {
  name: string;
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

describe("User Controller Integration Tests", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("POST /signup", () => {
    const validSignUpBody: SignUpBody = {
      name: "John Doe",
      account: "1234567890",
      email: "john@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    };

    test("should sign up a user successfully and return a token", async () => {
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token");

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(validSignUpBody)
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: "User created successfully. OTP sent to email.",
        data: {
          user: {
            _id: expect.any(String),
            name: "John Doe",
            account: "1234567890",
            email: "john@example.com",
            token: "mocked-token",
          },
        },
      });

      expect(jwt.sign).toHaveBeenCalledWith(
        { _id: expect.any(String) },
        "test-secret",
        { expiresIn: "1h" }
      );
      expect(sendOtpEmail).toHaveBeenCalledWith({
        email: "john@example.com",
        otp: "123456",
      });

      // Verify user in database
      const user = await User.findOne({ email: "john@example.com" });
      expect(user).toBeDefined();
      expect(user?.name).toBe("John Doe");
      expect(user?.account).toBe("1234567890");
      expect(user?.isVerified).toBe(false);
      expect(user?.otp).toBe("123456");
      expect(user?.balance).toBe(113000);
    });

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

    test("should return 400 for failed OTP email", async () => {
      (sendOtpEmail as jest.Mock).mockRejectedValueOnce(new Error("Email send failed"));

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
      const mongoServer = (global as any).__MONGO_SERVER__; // Access from setUpTest.ts
      await mongoose.connect(mongoServer.getUri());
    });

    test("should return 500 if JWT_SECRET is not defined", async () => {
      // Override the mock for this test
      jest.spyOn(require("../config/env"), "JWT_SECRET", "get").mockReturnValue(undefined);

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

  describe("POST /signin", () => {
    const validSignUpBody: SignUpBody = {
      name: "John Doe",
      account: "1234567890",
      email: "john@example.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    };
    const validSignInBody = {
      email: "john@example.com",
      password: "Password123!",
    };

    beforeEach(async () => {
      // Create and verify a user for sign-in tests
      await request(app).post("/api/auth/sign-in").send(validSignUpBody).expect(201);
      await User.updateOne({ email: "john@example.com" }, { isVerified: true });
    });

    test("should sign in a verified user successfully and return a token", async () => {
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token");

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(validSignInBody)
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        message: "Login successful",
        data: {
          user: {
            _id: expect.any(String),
            name: "John Doe",
            account: "1234567890",
            email: "john@example.com",
            token: "mocked-token",
            pinSet: expect.any(Boolean),
            isVerified: true,
            identityNumber: null,
            identityType: null,
          },
        },
      });

      expect(jwt.sign).toHaveBeenCalledWith(
        { _id: expect.any(String) },
        "test-secret",
        { expiresIn: "1h" }
      );
    });

    test("should return 403 if user is not verified", async () => {
      await User.updateOne({ email: "john@example.com" }, { isVerified: false });

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(validSignInBody)
        .expect(403);

      expect(response.body).toEqual({
        success: false,
        message: "Account not verified. Please check your email for OTP.",
      });
    });

    test.each([
      ["email and password require", { email: "", password: "Password123!" }],
      ["Please enter a valid email", { email: "invalid-email", password: "Password123!" }],
      ["Incorrect Credentials", { email: "john@example.com", password: "WrongPassword123!" }],
      ["Incorrect Credentials", { email: "nonexistent@example.com", password: "Password123!" }],
    ])("should return 400 for client error: %s", async (errorMessage: string, body: any) => {
      const response = await request(app)
        .post("/api/auth/sign-in")
        .send(body)
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: errorMessage,
      });
    });

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

      const mongoServer = (global as any).__MONGO_SERVER__; // Access from setUpTest.ts
      await mongoose.connect(mongoServer.getUri());
    });

    test("should return 500 if JWT_SECRET is not defined", async () => {
      // Override the mock for this test
      jest.spyOn(require("../config/env"), "JWT_SECRET", "get").mockReturnValue(undefined);

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