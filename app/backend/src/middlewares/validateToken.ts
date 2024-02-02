import { Request, Response, NextFunction } from 'express';

export default class ValidateToken {
    
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    next();
  }
}