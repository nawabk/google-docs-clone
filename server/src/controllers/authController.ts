import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../constants";
import Token, { IToken } from "../models/tokenModel";
import User, { IUser } from "../models/userModel";
import {
  CreateUserSchema,
  ResendTokenInput,
  SearchUserSchema,
  SignInInput,
  VerifyUserInput,
} from "../schema/request/userSchema";
import {
  SearchUserResponse,
  UserResponse,
} from "../schema/response/userSchema";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import sendEmail, { EmailType } from "../utils/sendEmail";

export const signup = catchAsync(
  async (
    req: Request<{}, {}, CreateUserSchema["body"]>,
    res: Response,
    next
  ) => {
    const newUser = await User.create<IUser>({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const newToken = (await Token.create({ userId: newUser._id })) as IToken;
    const message = `${process.env.CLIENT_URL}/verify_email?userId=${newUser._id}&token=${newToken.token}`;
    sendEmail({
      to: newUser.email,
      message,
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
    const message = `${process.env.CLIENT_URL}/verify_email?userId=${user._id}&token=${newToken.token}`;
    await sendEmail({
      to: user.email,
      message,
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

const signToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signIn = async (
  req: Request<{}, {}, SignInInput["body"]>,
  res: Response<UserResponse>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne<IUser>({ email });
    if (!user) throw new AppError("User does not exist.", 400);
    if (!user.isEmailVerified)
      throw new AppError("Please verify the user.", 400);
    if (!(await user.verifyPassword(user.password, password))) {
      throw new AppError("Password is Incorrect!", 400);
    }
    const token = signToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        status: "success",
        data: {
          username: user.username,
          _id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        },
      });
  } catch (e) {
    next(e);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token").status(200).json({
      status: "success",
      data: "Logout successfully!",
    });
  } catch (e) {
    next(e);
  }
};

export const searchUsers = async (
  req: Request<{}, {}, {}, SearchUserSchema["query"]>,
  res: Response<SearchUserResponse>,
  next: NextFunction
) => {
  try {
    const { text, limit = "10", page = "1" } = req.query;
    const limitInNumber = +limit;
    const pageInNumber = +page;
    if (isNaN(limitInNumber) || isNaN(pageInNumber)) {
      throw new AppError("Please provide limit or page in number.", 400);
    }
    const skip = (pageInNumber - 1) * limitInNumber;
    // const allUsers = await User.find<IUser>({
    //   $or: [
    //     { email: { $regex: text, $options: "i" } },
    //     { username: { $regex: text, $options: "i" } },
    //   ],
    // })
    //   .limit(limitInNumber)
    //   .skip(skip);
    // const result = await User.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { email: { $regex: text, $options: "i" } },
    //         { username: { $regex: text, $options: "i" } },
    //       ],
    //     },
    //   },
    //   {
    //     $facet: {
    //       totalCount: [{ $count: "count" }],
    //       paginatedResuls: [{ $skip: skip }, { $limit: limitInNumber }],
    //     },
    //   },
    // ]);
    const result = await User.aggregate()
      .project({
        _id: 1,
        email: 1,
        emailPrefix: { $arrayElemAt: [{ $split: ["$email", "@"] }, 0] },
        username: 1,
      })
      .match({
        $and: [
          { email: { $ne: req.user?.email } },
          {
            $or: [
              { emailPrefix: { $regex: text, $options: "i" } },
              { username: { $regex: text, $options: "i" } },
            ],
          },
        ],
      })
      .project({
        email: 1,
        username: 1,
      })
      .facet({
        totalCount: [{ $count: "count" }],
        paginatedResuls: [{ $skip: skip }, { $limit: limitInNumber }],
      });
    const paginatedResuls = result[0]
      .paginatedResuls as SearchUserResponse["data"];
    const totalCount = (result[0].totalCount[0]?.count ?? 0) as number;
    const totalPage =
      totalCount === 0 ? 0 : Math.ceil(totalCount / limitInNumber);
    res.status(200).json({
      status: "success",
      currPage: pageInNumber,
      totalPage,
      data: paginatedResuls,
    });
  } catch (e) {
    next(e);
  }
};
