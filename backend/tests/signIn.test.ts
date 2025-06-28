/*import mongoose from "mongoose";
import User from "../src/models/UserModels";
jest.setTimeout(60000);



describe("User.signIn()", () => {
  test("should successfully sign in with correct credentials", async () => {
    const user = await User.signIn("john@example.com", "Password123!");
    expect(user).toHaveProperty("_id", user._id);
    expect(user).toBeDefined();
    expect(user.email).toBe("john@example.com");
  });

  test("should throw error for incorrect password", async () => {
    await expect(
      User.signIn("john@example.com", "WrongPassword123!")
    ).rejects.toThrow("Incorrect Credentials");
  });

  test("should throw error for non-existent email", async () => {
    await expect(
      User.signIn("nonexistent@example.com", "Password123!")
    ).rejects.toThrow("Incorrect Credentials");
  });

  test("should throw error for missing email or password", async () => {
    await expect(User.signIn("", "Password123!")).rejects.toThrow(
      "email and password require"
    );

    await expect(User.signIn("john@example.com", "")).rejects.toThrow(
      "email and password require"
    );
  });

  test("should normalize email during sign in", async () => {
    const user = await User.signIn("John@Example.com", "Password123!");
    expect(user.email).toBe("john@example.com");
  });
});*/

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

interface SignUpBody {
  name: string;
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const createUserData = (overrides?: Partial<SignUpBody>) => ({
  name: "John Doe",
  email: `test-${Math.random().toString(36).substring(7)}@example.com`,
  account: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
  password: "Password123!",
  confirmPassword: "Password123!",
  ...overrides,
});

describe("SignUp Validation", () => {
  // Store these for duplicate tests
  const duplicateAccountUser = createUserData();
  const duplicateEmailUser = createUserData();
  
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

  describe("Business Logic", ()=>{
    test.each([
    [
      "Passwords do not match",
      createUserData({ confirmPassword: "Different123!" }),
    ],
    ["Please enter a valid email", createUserData({ email: "invalid-email" })],
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

      const response = await request(app).post("/api/auth/sign-up").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        success: false,
        message: errorMessage,
      });
    }
  );
  })

  
});
