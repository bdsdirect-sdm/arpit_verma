import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET="Arpit@123";

export const verifyToken = (req: any, res: any, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).send({ message: "No token provided!" });

  const user= jwt.verify(token, JWT_SECRET);
  if(!user)
  {
    console.log("Idhr aaja bhai.")
    return res.status(401).send({ message: "Unauthorized!" });

  }
  
  req.user = user;
  next();
  
};
