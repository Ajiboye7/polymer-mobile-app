import { Request, Response } from 'express';
import User from "../models/UserModels";


export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  const { otp, userId } = req.body;
  console.log("Received verification request for:", userId);

  try {
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (otp.length !== 6) {
      return res.status(400).json({ message: "Please enter a valid 6-digit OTP" });
    }

    const user = await User.findById(userId);
    console.log("Stored OTP:", user?.otp);
    console.log("Input OTP:", otp);



    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

  
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    
    });
    
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Internal server error" 
    });
  }
};
