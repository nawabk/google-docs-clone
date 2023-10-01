import { NextFunction, Request, Response } from "express";
import Token, { IToken } from "../models/tokenModel";
import User, { IUser } from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import sendEmail, { EmailType } from "../utils/sendEmail";
import { ERROR_MESSAGE } from "../constants";
import { isValidBody } from "../utils";
import { CreateUserSchema } from "../schema/userSchema";

export const signup = catchAsync(
  async (
    req: Request<{}, {}, CreateUserSchema["body"]>,
    res: Response,
    next
  ) => {
    const newUser = (await User.create(req.body)) as IUser;
    const newToken = (await Token.create({ userId: newUser._id })) as IToken;
    sendEmail({
      to: newUser.email,
      message: newToken.token,
      emailType: EmailType.EMAIL_VERIFICATION,
    });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  }
);

export const verifyUser = catchAsync(
  async (
    req: Request,
    res: Response<{ status: string; message: string }>,
    next: NextFunction
  ) => {
    const body = req.body as { userId: string; token: string };
    const token = await Token.findOne({
      userId: req.params.userId,
      token: req.query.token,
    });
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: ERROR_MESSAGE.INVALID_EMAIL_VERIFICATION,
      });
    }
    await User.updateOne({ _id: req.params.userId }, { isEmailVerified: true });
    res
      .status(201)
      .json({ status: "success", message: "Your email is verified" });
  }
);
