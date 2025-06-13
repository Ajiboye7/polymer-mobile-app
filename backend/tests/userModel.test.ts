{
  /*jest.mock("bcrypt", () => ({
  genSalt: jest.fn().mockResolvedValue("mocked_salt"),
  hash: jest.fn().mockResolvedValue("mocked_hashed_password"),
  compare: jest.fn().mockImplementation((password, hash) =>
    Promise.resolve(password === "Password123!" && hash === "mocked_hashed_password")
  ),
}));


import mongoose from "mongoose";
import User from "../src/models/UserModels";
import { sendOtpEmail, generateOTP } from "../src/utils/send-otp";
import bcrypt from "bcrypt";

console.log( 'mock function', bcrypt.genSalt); // Should show [MockFunction] if properly mocked


jest.setTimeout(60000);

// Mock bcrypt methods
 

describe("User.signUp()", () => {
  let user: any;

  beforeEach(async () => {
    // Clear mocks before each test
    jest.clearAllMocks();
    
    
    user = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
  });

  test("should successfully create a new user with OTP", async () => {
    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.account).toBe("1234567890");
    expect(user.password).toBe("mocked_hashed_password");
    expect(user.otp).toBe("123456");
    expect(user.otpExpiry).toBeDefined();
    expect(user.isVerified).toBe(false);
    expect(user.balance).toBe(113000);
  });

  test("should call bcrypt.genSalt and bcrypt.hash with correct parameters", async () => {
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("Password123!", "mocked_salt");
    expect(user.password).toBe("mocked_hashed_password");
  });

  test("should generate OTP using generateOTP", async () => {
    expect(generateOTP).toHaveBeenCalled();
    expect(user.otp).toBe("123456");
  });

  test("should set OTP expiry to 10 minutes in the future", async () => {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    const otpExpiry = new Date(user.otpExpiry).getTime();

    // Allow a small margin for timing differences (e.g., 1 second)
    expect(otpExpiry).toBeGreaterThanOrEqual(now + tenMinutes - 1000);
    expect(otpExpiry).toBeLessThanOrEqual(now + tenMinutes + 1000);
  });

  test("should call sendOtpEmail with correct parameters", async () => {
    expect(sendOtpEmail).toHaveBeenCalledWith({
      email: "john@example.com",
      otp: "123456",
    });
  });

  test("should throw error if sendOtpEmail fails", async () => {
    (sendOtpEmail as jest.Mock).mockRejectedValueOnce(new Error("Email send failed"));
    await expect(
      User.signUp(
        "Jane Doe",
        "9876543210",
        "jane@example.com",
        "Password123!",
        "Password123!"
      )
    ).rejects.toThrow("Failed to send OTP email. Please try again.");
  });

  test("should throw error for duplicate account number", async () => {
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
    const newUser = await User.signUp(
      "John Doe",
      "0987654321",
      "John2@Example.com",
      "Password123!",
      "Password123!"
    );
    expect(newUser.email).toBe("john2@example.com");
  });
});

describe("User.signIn()", () => {
  let testUser: any;

  beforeEach(async () => {
    jest.clearAllMocks();
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
    expect(user).toHaveProperty("_id", testUser._id);
    expect(user).toBeDefined();
    expect(user.email).toBe("john@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith("Password123!", "mocked_hashed_password");
  });

  test("should throw error for incorrect password", async () => {
    await expect(
      User.signIn("john@example.com", "WrongPassword123!")
    ).rejects.toThrow("Incorrect Credentials");
    expect(bcrypt.compare).toHaveBeenCalledWith("WrongPassword123!", "mocked_hashed_password");
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
}


import User from "../src/models/UserModels";
import { sendOtpEmail, generateOTP } from "../src/utils/send-otp";
import bcrypt from "bcrypt";

jest.setTimeout(60000);

describe("User.signUp()", () => {
  let user: any;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Mock bcrypt methods using jest.spyOn
    jest
      .spyOn(bcrypt, "genSalt")
      .mockImplementation(() => Promise.resolve("mocked_salt"));
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(() => Promise.resolve("mocked_hashed_password"));
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation((data: string | Buffer, encrypted: string) =>
        Promise.resolve(
          typeof data === "string" &&
            data === "Password123!" &&
            encrypted === "mocked_hashed_password"
        )
      );
    user = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should successfully create a new user with OTP", async () => {
    expect(user).toBeDefined();
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.account).toBe("1234567890");
    expect(user.password).toBe("mocked_hashed_password");
    expect(user.otp).toBe("123456");
    expect(user.otpExpiry).toBeDefined();
    expect(user.isVerified).toBe(false);
    expect(user.balance).toBe(113000);
  });

 

  test("should throw error for missing or invalid sign-up fields", async () => {
  const valid: [string, string, string, string, string] = [
    "John Doe",
    "1234567890",
    "john@example.com",
    "Password123!",
    "Password123!",
  ];

  const invalidValues: any[] = ["", "   ", null, undefined];

  for (let i = 0; i < valid.length; i++) {
    for (const invalid of invalidValues) {
      const args: [string, string, string, string, string] = [...valid];
      args[i] = invalid as any; 

      await expect(User.signUp(...args)).rejects.toThrow("All fields are required");
    }
  }
});


  test("should call bcrypt.genSalt and bcrypt.hash with correct parameters", async () => {
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith("Password123!", "mocked_salt");
    expect(user.password).toBe("mocked_hashed_password");
  });

  test("should generate OTP using generateOTP", async () => {
    expect(generateOTP).toHaveBeenCalled();
    expect(user.otp).toBe("123456");
  });

  test("should set OTP expiry to 10 minutes in the future", async () => {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    const otpExpiry = new Date(user.otpExpiry).getTime();

    // Allow a small margin for timing differences (e.g., 1 second)
    expect(otpExpiry).toBeGreaterThanOrEqual(now + tenMinutes - 1000);
    expect(otpExpiry).toBeLessThanOrEqual(now + tenMinutes + 1000);
  });

  test("should call sendOtpEmail with correct parameters", async () => {
    expect(sendOtpEmail).toHaveBeenCalledWith({
      email: "john@example.com",
      otp: "123456",
    });
  });

  test("should throw error if sendOtpEmail fails", async () => {
    (sendOtpEmail as jest.Mock).mockRejectedValueOnce(
      new Error("Email send failed")
    );
    await expect(
      User.signUp(
        "Jane Doe",
        "9876543210",
        "jane@example.com",
        "Password123!",
        "Password123!"
      )
    ).rejects.toThrow("Failed to send OTP email. Please try again.");
  });

  test("should throw error for duplicate account number", async () => {
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
    const newUser = await User.signUp(
      "John Doe",
      "0987654321",
      "John2@Example.com",
      "Password123!",
      "Password123!"
    );
    expect(newUser.email).toBe("john2@example.com");
  });
});

describe("User.signIn()", () => {
  let testUser: any;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Mock bcrypt methods using jest.spyOn
    jest
      .spyOn(bcrypt, "genSalt")
      .mockImplementation(() => Promise.resolve("mocked_salt"));
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(() => Promise.resolve("mocked_hashed_password"));
    jest
      .spyOn(bcrypt, "compare")
      .mockImplementation((data: string | Buffer, encrypted: string) =>
        Promise.resolve(
          typeof data === "string" &&
            data === "Password123!" &&
            encrypted === "mocked_hashed_password"
        )
      );

    // console.log("bcrypt.genSalt in test (signIn):", bcrypt.genSalt);

    testUser = await User.signUp(
      "John Doe",
      "1234567890",
      "john@example.com",
      "Password123!",
      "Password123!"
    );
  });

  afterEach(() => {
    // Restore mocks after each test
    jest.restoreAllMocks();
  });

  test("should successfully sign in with correct credentials", async () => {
    const user = await User.signIn("john@example.com", "Password123!");
    expect(user).toHaveProperty("_id", testUser._id);
    expect(user).toBeDefined();
    expect(user.email).toBe("john@example.com");
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "Password123!",
      "mocked_hashed_password"
    );
  });

  test("should throw error for incorrect password", async () => {
    await expect(
      User.signIn("john@example.com", "WrongPassword123!")
    ).rejects.toThrow("Incorrect Credentials");
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "WrongPassword123!",
      "mocked_hashed_password"
    );
  });

  test("should throw error for non-existent email", async () => {
    await expect(
      User.signIn("nonexistent@example.com", "Password123!")
    ).rejects.toThrow("Incorrect Credentials");
  });

  test("should throw error for invalid email", async () => {
    await expect(User.signIn("invalid-email", "Password123!")).rejects.toThrow(
      "Please enter a valid email"
    );
  });

  
  

  test("should throw error for missing or invalid email or password", async () => {
  const valid: [string, string] = ["john@example.com", "Password123!"];
  const invalidValues: any[] = ["", "   ", null, undefined];

  for (let i = 0; i < valid.length; i++) {
    for (const invalid of invalidValues) {
      const args: [string, string] = [...valid];
      args[i] = invalid as any;

      await expect(User.signIn(...args)).rejects.toThrow("Email and password are required");
    }
  }
});


  test("should normalize email during sign in", async () => {
    const user = await User.signIn("John@Example.com", "Password123!");
    expect(user.email).toBe("john@example.com");
  });
});
