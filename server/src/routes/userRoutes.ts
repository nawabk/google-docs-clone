import express, { NextFunction, Request, Response } from "express";
import {
  resendVerificationToken,
  signIn,
  signup,
  verifyUser,
} from "../controllers/authController";
import { protect } from "../middleware/protect";
import { validateResource } from "../middleware/validateResource";
import {
  createUserSchema,
  resendTokenInput,
  signInInput,
  verifyUserInput,
} from "../schema/request/userSchema";
import { UserResponse } from "../schema/response/userSchema";
import AppError from "../utils/appError";

const router = express.Router();

router.post("/signup", validateResource(createUserSchema), signup);
router.post("/signin", validateResource(signInInput), signIn);
router.patch("/:userId/verify", validateResource(verifyUserInput), verifyUser);
router.post(
  "/:userId/resend-token",
  validateResource(resendTokenInput),
  resendVerificationToken
);
router.get(
  "/validate",
  protect,
  (req: Request, res: Response<UserResponse>, next: NextFunction) => {
    const currentUser = req.user;
    if (!currentUser) return next(new AppError("No User found", 400));

    res.status(200).json({
      status: "success",
      data: {
        _id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        isEmailVerified: currentUser.isEmailVerified,
      },
    });
  }
);

export default router;
