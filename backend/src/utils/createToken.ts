import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";


export const createToken = (_id: string) => {
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }
  
    return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "1h" });
  };