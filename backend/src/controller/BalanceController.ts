import User from "../models/UserModels";
import { Request, Response } from "express";

export const getBalance = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("balance");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User balance fetched successfully",
      data: {
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("User balance fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching balance",
    });
  }
};

export const deductBalance = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user._id;
    const { amount } = req.body;

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    
    if (typeof user.balance !== "number") {
      return res.status(400).json({
        success: false,
        message: "Balance is not valid",
      });
    }

    
    if (user.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient funds",
      });
    }

    user.balance -= amount;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Balance deducted successfully",
      data: {
        newBalance: user.balance,
      },
    });
  } catch (error) {
    console.error("Error deducting balance:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deducting balance",
    });
  }
};
