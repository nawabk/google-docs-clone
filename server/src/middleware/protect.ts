import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/appError";

interface MyJwtPayload extends JwtPayload {
  _id: string;
  // add other fields as necessary
}

function verifyToken<T extends JwtPayload>(
  token: string,
  secret: string,
  callback: (err: VerifyErrors | null, decoded: T | undefined) => void
): void {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return callback(err, undefined);
    }
    callback(null, decoded as T);
  });
}
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return next(
        new AppError("You are not logged in! Please login to get access", 401)
      );
    }
    verifyToken<MyJwtPayload>(
      token,
      process.env.JWT_SECRET!,
      async (err, decoded) => {
        if (err) {
          return next(new AppError("Token verification failed", 401));
        }
        const userId = decoded?._id;
        const currentUser = await User.findById<IUser>(userId);
        if (!currentUser) {
          return next(
            new AppError(
              "The user belonging to this token does not exist.",
              401
            )
          );
        }
        req.user = currentUser;
        next();
      }
    );
  } catch (e) {
    next(e);
  }
};
