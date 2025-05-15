
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        // Add other user properties if needed
      };
    }
  }
}

export interface AuthRequest extends Request {
  user: {
    _id: string;
  };
}