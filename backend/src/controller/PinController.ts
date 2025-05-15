import { Request, Response } from "express";
import User from "../models/UserModels";
import bcrypt from "bcrypt";

const COMMON_PINS = [
  "0000",
  "1111",
  "2222",
  "3333",
  "4444",
  "5555",
  "6666",
  "7777",
  "8888",
  "9999",
  "1234",
  "4321",
  "1004",
  "2000",
  "1212",
  "1122",
  "1313",
  "2001",
  "1010",
  "1221",
];
const MIN_SALT_ROUNDS = 10;

export const createPin = async (req: Request, res: Response): Promise<any> => {
  const { pin } = req.body;
  const userId = req.user._id;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
      return res
        .status(400)
        .json({ success: false, message: "PIN must be a 4-digit number" });
    }

    if (COMMON_PINS.includes(pin)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This PIN is too common. Please choose a more secure PIN",
        });
    }

    if (
      /(\d)\1{3}/.test(pin) ||
      "0123456789".includes(pin) ||
      "9876543210".includes(pin)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This PIN pattern is not allowed. Please choose a more complex PIN.",
      });
    }

    const hashedPin = await bcrypt.hash(pin, MIN_SALT_ROUNDS);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { pin: hashedPin, pinSet: true },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(201).json({
      success: true,
      message: "PIN created successfully",
      data: {
        pinSet: true,
      },
    });
  } catch (error) {
    console.error("PIN creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during PIN creation",
    });
  }
};

export const confirmPin = async (req: Request, res: Response): Promise<any> => {
  const { pin } = req.body;
  const userId = req.user._id;

  try {
    if (!userId || !pin) {
      return res.status(400).json({
        success: false,
        message: "User ID and PIN are required",
      });
    }

    const user = await User.findById(userId);

    if (!user || !user.pin) {
      return res.status(400).json({
        success: false,
        message: "User or PIN not found",
      });
    }

    const pinMatch = await bcrypt.compare(pin, user.pin);

    if (!pinMatch) {
      return res.status(400).json({
        success: false,
        message: "PIN does not match",
      });
    }

    // ✅ Only update if match
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "PIN verified successfully",
      data: {
        isVerified: true,
      },
    });
  } catch (error) {
    console.error("PIN verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during PIN verification",
    });
  }
};
