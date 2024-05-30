import express, { Response } from "express";
import {
  resendVerificationToken,
  signIn,
  signup,
  verifyUser,
} from "../controllers/authController";
import { RequestWithUser, protect } from "../middleware/protect";
import { validateResource } from "../middleware/validateResource";
import {
  createUserSchema,
  resendTokenInput,
  signInInput,
  verifyUserInput,
} from "../schema/request/userSchema";

const router = express.Router();

router.post("/signup", validateResource(createUserSchema), signup);
router.post("/signin", validateResource(signInInput), signIn);
router.patch("/:userId/verify", validateResource(verifyUserInput), verifyUser);
router.post(
  "/:userId/resend-token",
  validateResource(resendTokenInput),
  resendVerificationToken
);
router.get("/private", protect, (req: RequestWithUser, res: Response) => {
  res.send("Private accessed");
});

export default router;
