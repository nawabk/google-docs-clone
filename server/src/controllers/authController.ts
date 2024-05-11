import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGE } from "../constants";
import Token, { IToken } from "../models/tokenModel";
import User, { IUser } from "../models/userModel";
import {
  CreateUserSchema,
  ResendTokenInput,
  SignInInput,
  VerifyUserInput,
} from "../schema/userSchema";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import sendEmail, { EmailType } from "../utils/sendEmail";

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

export const verifyUser = async (
  req: Request<VerifyUserInput["params"], {}, VerifyUserInput["body"]>,
  res: Response<{ status: string; message: string }>,
  next: NextFunction
) => {
  try {
    const token = await Token.findOne({
      userId: req.params.userId,
      token: req.body.token,
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
  } catch (e) {
    next(e);
  }
};

export const resendVerificationToken = async (
  req: Request<ResendTokenInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await User.findOne({ _id: req.params.userId })) as IUser;
    if (!user) return next(new AppError("User doest not exist", 404));
    const newToken = (await Token.create({ userId: user._id })) as IToken;
    await sendEmail({
      to: user.email,
      message: newToken.token,
      emailType: EmailType.EMAIL_VERIFICATION,
    });
    res.status(201).json({
      status: "success",
      message: "Another verification link has been sent to your email address.",
    });
  } catch (e) {
    next(e);
  }
};

export const signIn = async (
  req: Request<{}, {}, SignInInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne<IUser>({ email });
    if (!user) throw new AppError("User does not exist.", 400);
    if (!user.isEmailVerified)
      throw new AppError("Please verify the user.", 400);
    res.send(200).json({
      status: "success",
      message: "Well Done!",
    });
  } catch (e) {
    next(e);
  }
};
