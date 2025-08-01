jest.mock("jsonwebtoken");
jest.mock("../src/config/env", () => ({
  JWT_SECRET: "test-secret",
}));

jest.mock("../src/utils/send-otp", () => ({
  sendOtpEmail: jest.fn().mockResolvedValue(true),
  generateOTP: jest.fn().mockReturnValue(123456),
}));

import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../src/utils/send-otp";
import { generateOTP } from "../src/utils/send-otp";
import User from "../src/models/UserModels";

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

const createUserData = (overrides?: Partial<SignUpBody>) => ({
  name: "John Doe",
  email: `test-${Math.random().toString(36).substring(7)}@example.com`,
  account: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
  password: "Password123!",
  confirmPassword: "Password123!",
  ...overrides,
});

const duplicateAccountUser = createUserData();
const duplicateEmailUser = createUserData();

describe("SignUp test", () => {
  // Store these for duplicate tests

  describe("Required fields validation", () => {
    const validUser = createUserData();
    const fields: (keyof SignUpBody)[] = [
      "name",
      "email",
      "account",
      "password",
      "confirmPassword",
    ];
    const invalidValues: any[] = ["", "   ", null, undefined];

    test.each(fields)(
      "should return 400 when %s is missing or empty",
      async (field) => {
        for (const invalidValue of invalidValues) {
          const invalidUser = { ...validUser, [field]: invalidValue };
          const response = await request(app)
            .post("/api/auth/sign-up")
            .send(invalidUser);

          expect(response.status).toBe(400);
          expect(response.body).toEqual({
            success: false,
            message: "All fields are to be filled",
          });
        }
      }
    );
  });

  describe("Business Logic", () => {
    test.each([
      [
        "Passwords do not match",
        createUserData({ confirmPassword: "Different123!" }),
      ],
      [
        "Please enter a valid email",
        createUserData({ email: "invalid-email" }),
      ],
      [
        "Password not strong enough",
        createUserData({ password: "weak", confirmPassword: "weak" }),
      ],
      [
        "Account number already exists",
        createUserData({
          account: duplicateAccountUser.account,
        }),
      ],
      [
        "Email already exists",
        createUserData({
          email: duplicateEmailUser.email,
        }),
      ],
    ])(
      "should return 400 for %s",
      async (errorMessage: string, body: SignUpBody) => {
        // Pre-create users for duplicate tests
        if (errorMessage === "Account number already exists") {
          await request(app)
            .post("/api/auth/sign-up")
            .send(duplicateAccountUser)
            .expect(201);
        } else if (errorMessage === "Email already exists") {
          await request(app)
            .post("/api/auth/sign-up")
            .send(duplicateEmailUser)
            .expect(201);
        }
        const response = await request(app)
          .post("/api/auth/sign-up")
          .send(body);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          success: false,
          message: errorMessage,
        });
      }
    );
  });

  describe("Sign up user", () => {
    test("should a create user, send OTP and return token", async () => {
      (sendOtpEmail as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token-123");

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(createUserData())
        .expect(201);

      expect(response.body).toEqual({
        success: true,
        message: "User created successfully. OTP sent to email.",
        data: {
          user: {
            _id: expect.any(String),
            name: "John Doe",
            account: expect.any(String),
            email: expect.any(String),
            token: "mocked-token-123",
          },
        },
      });
    });
  });
  describe("Error Handling", () => {
    beforeEach(() => {
      jest.requireMock("../src/config/env").JWT_SECRET = undefined;
    });

    afterEach(() => {
      jest.requireMock("../src/config/env").JWT_SECRET = "test-secret";
    });
    test("should handle missing JWT SECRET", async () => {
      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(createUserData())
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "An unexpected error occurred during registration",
      });
    });

    test("should handle OTP email failure", async () => {
      (sendOtpEmail as jest.Mock).mockRejectedValue(
        "Failed to send OTP email. Please try again"
      );

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(createUserData())
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        message: "Failed to send OTP email. Please try again.",
      });
    });

    test("should handle database error", async () => {
      await mongoose.connection.close();

      const response = await request(app)
        .post("/api/auth/sign-up")
        .send(createUserData())
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "An unexpected error occurred during registration",
      });
    });
  });
});

describe("SignIn test", () => {
  let userData: SignUpBody;
  beforeEach(async () => {
    userData = createUserData();
    (sendOtpEmail as jest.Mock).mockResolvedValue(true);

    await request(app).post("/api/auth/sign-up").send(userData);

    await User.updateOne({ email: userData.email }, { isVerified: true });
  });

  describe("Validation test", () => {
    const fields: (keyof SignInBody)[] = ["email", "password"];

    const invalidValues: any[] = ["", "   ", null, undefined];

    test.each(fields)(
      "should return 400 when %s is missing or empty",
      async (field) => {
        const validUser = {
          email: userData.email,
          password: userData.password,
        };
        for (const invalidValue of invalidValues) {
          const invalidUser = { ...validUser, [field]: invalidValue };

          const response = await request(app)
            .post("/api/auth/sign-in")
            .send(invalidUser)
            .expect(400);

          expect(response.body).toEqual({
            success: false,
            message: "email and password required",
          });
        }
      }
    );
  });

  describe("SignIn user", () => {
    test("should successfully sign in user", async () => {
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token-123");

      const response = await request(app).post("/api/auth/sign-in").send({
        email: userData.email,
        password: userData.password,
      });

      expect(response.body).toEqual({
        success: true,
        message: "Login successful",
        data: {
          user: {
            _id: expect.any(String),
            name: "John Doe",
            account: expect.any(String),
            email: expect.any(String),
            token: "mocked-token-123",
            pinSet: expect.any(Boolean),
            isVerified: true,
          },
        },
      });
    });
  });

  type TestCase = {
    errorMessage: string;
    buildBody: () => SignInBody;
  };

  const testCases: TestCase[] = [
    {
      errorMessage: "Please enter a valid email",
      buildBody: () => ({
        email: "invalid-email",
        password: userData.password,
      }),
    },
    {
      errorMessage: "Incorrect Credentials",
      buildBody: () => ({
        email: "nonexisting@gmail.com",
        password: userData.password,
      }),
    },
    {
      errorMessage: "Incorrect Credentials",
      buildBody: () => ({ email: userData.email, password: "wrong-password" }),
    },
  ];
  describe("Business logic", () => {
    test.each(testCases)(
      "should return 400 for $errorMessage",
      async ({ errorMessage, buildBody }) => {
        const response = await request(app)
          .post("/api/auth/sign-in")
          .send(buildBody())
          .expect(400);

        expect(response.body).toEqual({
          success: false,
          message: errorMessage,
        });
      }
    );
    test("should test for unverified user", async () => {
      (jwt.sign as jest.Mock).mockReturnValue("mocked-token-123");

      await User.updateOne({ email: userData.email }, { isVerified: false });

      const response = await request(app)
        .post("/api/auth/sign-in")
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(403);

      expect(response.body).toEqual({
        success: false,
        message:
          "Account not verified. Please try add pin and confirm pin to get verified.",
      });
    });
  });

  describe("Error handling", () => {
    describe("JWT SECRET error", () => {
      beforeEach(() => {
        jest.requireMock("../src/config/env").JWT_SECRET = undefined;
      });

      afterEach(() => {
        jest.requireMock("../src/config/env").JWT_SECRET = "test-secret";
      });
      test("should return 500 if JWT_SECRET is not defined", async () => {
        const response = await request(app)
          .post("/api/auth/sign-in")
          .send({
            email: userData.email,
            password: userData.password,
          })
          .expect(500);

        expect(response.body).toEqual({
          success: false,
          message: "An unexpected error occurred during login",
        });
      });
    });
  });
});
