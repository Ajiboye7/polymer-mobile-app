import { Request, Response } from "express";
import User from "../models/UserModels";

export const updateIdentity = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { identityType } = req.body;
  const userId = req.user._id;

  try {
    if (!identityType) {
      return res.status(400).json({
        success: false,
        message: "Identity type are required",
      });
    }

    if(!userId){
      return res.status(401).json({
        success: false,
        message: "Request is not authorized",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { identityType },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    

    return res.status(200).json({
      success: true,
      message: "Identity type updated successfully",
      data: {
        identityType: updatedUser.identityType,
      },
    });
  } catch (error) {
    console.error("Identity update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during identity update",
    });
  }
};

export const identityNumber = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { identityNumber } = req.body;
  const userId = req.user._id;

  try {
    if (!userId || !identityNumber) {
      return res.status(400).json({
        success: false,
        message: "User ID and identity number are required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { identityNumber },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Identity number updated successfully",
      data: {
        identityNumber: updatedUser.identityNumber,
      },
    });
  } catch (error) {
    console.error("Identity number update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during identity number update",
    });
  }
};
