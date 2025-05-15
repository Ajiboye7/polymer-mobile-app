import { Request, Response } from "express";
import { JWT_SECRET } from "../config/env";
import jwt from "jsonwebtoken";


const createNewToken = (_id: string) => {
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }
  
    return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "7d" });
  };



export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user._id;
  //console.log(userId)
  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }

    const newToken = createNewToken(userId);

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        newToken,
      },
    });
  } catch (error) {
    console.error( 'token refresh error:' , error)
    return res.status(500).json({
        success : false,
        message: 'Internal server error during token refresh'
    })
  }
};
