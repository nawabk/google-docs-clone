import express from "express";
import {
  resendVerificationToken,
  signIn,
  signup,
  verifyUser,
} from "../controllers/authController";
import { validateResource } from "../middleware/validateResource";
import {
  createUserSchema,
  resendTokenInput,
  signInInput,
  verifyUserInput,
} from "../schema/userSchema";

const router = express.Router();

router.post("/signup", validateResource(createUserSchema), signup);
router.post("/signin", validateResource(signInInput), signIn);
router.patch("/:userId/verify", validateResource(verifyUserInput), verifyUser);
router.post(
  "/:userId/resend-token",
  validateResource(resendTokenInput),
  resendVerificationToken
);

export default router;
