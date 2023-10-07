import express from "express";
import {
  resendVerificationToken,
  signup,
  verifyUser,
} from "../controllers/authController";
import { validateResource } from "../middleware/validateResource";
import {
  createUserSchema,
  resendTokenInput,
  verifyUserInput,
} from "../schema/userSchema";

const router = express.Router();

router.post("/", validateResource(createUserSchema), signup);
router.patch("/:userId/verify", validateResource(verifyUserInput), verifyUser);
router.post(
  "/:userId/resend-token",
  validateResource(resendTokenInput),
  resendVerificationToken
);

export default router;
