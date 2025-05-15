import Profile from "../models/ProfileModels";
import UserProfile from "../models/ProfileModels";
import { Request, Response } from "express";
import path from "path";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { phoneNumber, address, nextOfKin, nextOfKinRelationship } = req.body;
    const userId = req.user._id;
    //console.log("userId from request", userId);
    //console.log("Received data:", req.body);
    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this user",
      });
    }

    const profile = await UserProfile.profile(
      phoneNumber,
      address,
      nextOfKin,
      nextOfKinRelationship,
      userId
    );

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Profile creation error:", error);

    if (error instanceof Error) {
      const errorMessage = error.message;

      const clientErrors = [
        "All fields are to be filled",
        "Invalid phone number format",
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
      message: "An unexpected error occurred while creating profile",
    });
  }
};

export const uploadProfilePicture = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = req.user._id;

  const imageUri = `/uploads/profile-pictures/${req.file?.filename}`;

  try {
    //console.log(req.file)
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    if (!imageUri) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: userId },
      { profilePicture: imageUri },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      data: {
        profilePicture: updatedProfile.profilePicture,
      },
    });
  } catch (error) {
    console.log("profile picture upload error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while uploading profile picture",
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching profile",
    });
  }
};
