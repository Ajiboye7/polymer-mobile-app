import jwt from "jsonwebtoken";
import User from "../models/UserModels";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";
import { AuthRequest } from "../types/express";

const requiredAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token Required" });
  }
  const token = authorization.split(" ")[1];

  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT secret is not defined" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };

    const user = await User.findById(decoded._id).select("_id");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { _id: user._id.toString() };

    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError &&
      req.originalUrl.includes("/refresh-token")
    ) {
      const decoded = jwt.decode(token) as { _id: string };

      if (!decoded?._id) {
        return res.status(401).json({ error: "Invalid expired token" });
      }
      const user = await User.findById(decoded._id).select("_id");

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.user = { _id: user._id.toString() };
      return next();
    }

    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requiredAuth;
