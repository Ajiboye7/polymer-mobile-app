import User from "../models/UserModels";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

const createToken = (_id: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }

  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
};

export const signUpUser = async (req: Request, res: Response): Promise<any> => {
  const { name, account, email, password, confirmPassword } = req.body;

  try {
    const user = await User.signUp(
      name,
      account,
      email,
      password,
      confirmPassword
    );
    const token = createToken(user._id);

    return res.status(201).json({
      success: true,
      message: "User created successfully. OTP sent to email.",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          account: user.account,
          email: user.email,
          token,
        },
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message;

      const clientErrors = [
        "All fields are to be filled",
        "Passwords do not match",
        "Please enter a valid email",
        "Account number already exists",
        "Password not strong enough",
        "Email already exists",
        "Failed to send OTP email. Please try again.",
      ];

      if (clientErrors.some((msg) => errorMessage.includes(msg))) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during registration",
    });
  }
};

export const signInUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.signIn(email, password);

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Account not verified. Please check your email for OTP.",
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          account: user.account,
          email: user.email,
          token,
          pinSet: user.pinSet,
          isVerified: user.isVerified,
          identityNumber: user.identityNumber,
          identityType: user.identityType,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message;

      const clientErrors = [
        "email and password require",
        "Please enter a valid email",
        //"User does not exist",
        'Incorrect Credentials',
        //'Incorrect Credentials'
       /// "Incorrect password",
      ];

      if (clientErrors.some((msg) => errorMessage.includes(msg))) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login",
    });
  }
};

\