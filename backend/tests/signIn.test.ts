import mongoose from "mongoose";
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
});

{/*import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../src/models/UserModels';
import bcrypt from 'bcrypt';





describe('User Model - signIn', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should sign in user with valid credentials', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = await User.create({
      name: 'John Doe',
      account: '1234567890',
      email: 'test@example.com',
      password: hashedPassword,
    });

    const result = await User.signIn('test@example.com', '123456');
    expect(result).toHaveProperty('_id', user._id);
    expect(result.email).toBe('test@example.com');
  });

  it('should throw error for invalid email',  async () => {
    await expect(User.signIn('invalid@example.com', '123456')).rejects.toThrow('Incorrect Credentials');
  });

  it('should throw error for incorrect password', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    await User.create({
      name: 'John Doe',
      account: '1234567890',
      email: 'test@example.com',
      password: hashedPassword,
    });

    await expect(User.signIn('test@example.com', 'wrong')).rejects.toThrow('Incorrect Credentials');
  });

  it('should normalize email to lowercase', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = await User.create({
      name: 'John Doe',
      account: '1234567890',
      email: 'test@example.com',
      password: hashedPassword,
    });

    const result = await User.signIn('TEST@example.com', '123456');
    expect(result).toHaveProperty('_id', user._id);
  });
});*/
}
