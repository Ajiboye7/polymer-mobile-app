import mongoose from "mongoose";
import User from "../src/models/UserModels"; 
jest.setTimeout(60000);

describe("User.signIn()", () => {


  test("should successfully sign in with correct credentials", async () => {
    const user = await User.signIn("john@example.com", "Password123!");
    
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
    await expect(
      User.signIn("", "Password123!")
    ).rejects.toThrow("email and password require");
    
    await expect(
      User.signIn("john@example.com", "")
    ).rejects.toThrow("email and password require");
  });

  test("should normalize email during sign in", async () => {
    const user = await User.signIn("John@Example.com", "Password123!");
    expect(user.email).toBe("john@example.com");
  });
});