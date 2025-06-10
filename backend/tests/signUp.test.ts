import mongoose from "mongoose";
import User from "../src/models/UserModels"; 
jest.setTimeout(60000);

beforeEach(async () => {
  await User.deleteMany({}); 
});


describe("User.signUp()", () => {
  test("should successfully create a new user with OTP", async () => {
    const user = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
    
    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.account).toBe("1234567890");
    expect(user.password).not.toBe("Password123!"); // Should be hashed
    expect(user.otp).toBeDefined();
    expect(user.otpExpiry).toBeDefined();
    expect(user.isVerified).toBe(false);
    expect(user.balance).toBe(113000); // Testing default balance
  });

  test("should throw error for duplicate account number", async () => {
    await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
    
    await expect(
      User.signUp(
        "Jane Doe",
        "1234567890", // Same account number
        "jane@example.com",
        "Password123!",
        "Password123!"
      )
    ).rejects.toThrow("Account number already exists");
  });

  test("should throw error for weak password", async () => {
    await expect(
      User.signUp(
        "John Doe",
        "1234567890",
        "john@example.com",
        "weak", // Weak password
        "weak"
      )
    ).rejects.toThrow("Password not strong enough");
  });

  test("should throw error for password mismatch", async () => {
    await expect(
      User.signUp(
        "John Doe",
        "1234567890",
        "john@example.com",
        "Password123!",
        "DifferentPassword123!" // Mismatch
      )
    ).rejects.toThrow("Passwords do not match");
  });

  test("should throw error for invalid email", async () => {
    await expect(
      User.signUp(
        "John Doe",
        "1234567890",
        "invalid-email", // Invalid email
        "Password123!",
        "Password123!"
      )
    ).rejects.toThrow("Please enter a valid email");
  });

  test("should normalize email to lowercase", async () => {
    const user = await User.signUp(
      "John Doe",
      "1234567890",
      "John@Example.com", // Mixed case
      "Password123!",
      "Password123!"
    );
    
    expect(user.email).toBe("john@example.com"); // Should be lowercase
  });
});
