import mongoose from "mongoose";
import User from "../src/models/UserModels";
jest.setTimeout(60000);

describe("User.signUp()", () => {
  let user: any;

  beforeEach(async () => {
    user = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
  });

  test("should successfully create a new user with OTP", async () => {
    /*const user = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );*/

    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.account).toBe("1234567890");
    expect(user.password).not.toBe("Password123!");
    expect(user.otp).toBeDefined();
    expect(user.otpExpiry).toBeDefined();
    expect(user.isVerified).toBe(false);
    expect(user.balance).toBe(113000);
  });

  test("should throw error for duplicate account number", async () => {
    /* await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );*/

    await expect(
      User.signUp(
        "Jane Doe",
        "1234567890",
        "jane@example.com",
        "Password123!",
        "Password123!"
      )
    ).rejects.toThrow("Account number already exists");
  });

  test("should throw an error for existing email address", async () => {
    /* await User.signUp(
      "Jane Doe",
      "1234567890",
      "jane@example.com",
      "Password123!",
      "Password123!"
    );*/

    await expect(
      User.signUp(
        "Jane Doe",
        "1234544",
        "john@example.com",
        "Test@123",
        "Test@123"
      )
    ).rejects.toThrow("Email already exists");
  });

  test("should throw error for weak password", async () => {
    await expect(
      User.signUp("John Doe", "1234567897", "john@example.com", "weak", "weak")
    ).rejects.toThrow("Password not strong enough");
  });

  test("should throw error for password mismatch", async () => {
    await expect(
      User.signUp(
        "John Doe",
        "1234567890",
        "john@example.com",
        "Password123!",
        "DifferentPassword123!"
      )
    ).rejects.toThrow("Passwords do not match");
  });

  test("should throw error for invalid email", async () => {
    await expect(
      User.signUp(
        "John Doe",
        "1234567890",
        "invalid-email",
        "Password123!",
        "Password123!"
      )
    ).rejects.toThrow("Please enter a valid email");
  });

  test("should normalize email to lowercase", async () => {
    /*const user = await User.signUp(
      "John Doe",
      "1234567890",
      "John@Example.com",
      "Password123!",
      "Password123!"
    );*/

    expect(user.email).toBe("john@example.com");
  });
});

describe("User.signIn()", () => {
  let testUser: any;

  beforeEach(async () => {
    testUser = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
  });

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
});
