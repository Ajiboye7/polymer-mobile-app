import mongoose from "mongoose";
import User from "../src/models/UserModels"; 
jest.setTimeout(60000);

beforeEach(async () => {
  await User.deleteMany({}); 
});

describe("User Model", () => {
  test("should sign up a new user", async () => {
    const user = await User.signUp(
      "John Doe",
      "123456",
      "john@example.com",
      "Test@123",
      "Test@123"
    );

    expect(user).toBeDefined();
    expect(user.email).toBe("john@example.com");
    expect(user.name).toBe("John Doe");
  });

  test("should not sign a user with an existing email", async () => {
    await User.signUp(
      "Jane Doe",
      "987654",
      "jane@example.com",
      "Test@123",
      "Test@123"
    );

    await expect(
      User.signUp(
        "Jane Doe",
        "123456",
        "jane@example.com",
        "Test@123",
        "Test@123"
      )
    ).rejects.toThrow("email already exists");
  });

  test("should throw an error for invalid email", async () => {
    await expect(
      User.signUp("John Doe", "123456", "invalid-email", "Test@123", "Test@123")
    ).rejects.toThrow("please enter a valid email");
  });

  test("should not create a user wit an existing account", async () => {
    await User.signUp(
      "Jane Doe",
      "1234544",
      "jane@example.com",
      "Test@123",
      "Test@123"
    );

    await expect(
      User.signUp(
        "Jane Doe",
        "1234544",
        "jane@example.com",
        "Test@123",
        "Test@123"
      )
    ).rejects.toThrow("Account number already exists")
  });

  test("should successfully sign in a user", async () => {
    await User.signUp(
      "Jane Doe",
      "987654",
      "jane@example.com",
      "Test@123",
      "Test@123"
    );

    const user = await User.signIn("jane@example.com", "Test@123");
    expect(user).toBeDefined();
    expect(user.email).toBe("jane@example.com");
  });

  test("should throw an error for incorrect password", async () => {
    await User.signUp(
      "John Doe",
      "123456",
      "john@example.com",
      "Test@123",
      "Test@123"
    );

    await expect(
      User.signIn("john@example.com", "WrongPassword")
    ).rejects.toThrow("Incorrect password");
  });
});
