import express from "express";
import { signup, verifyUser } from "../controllers/authController";
import { validateResource } from "../middleware/validateResource";
import { createUserSchema } from "../schema/userSchema";

const router = express.Router();

router.patch("/verify", verifyUser);
router.post("/", validateResource(createUserSchema), signup);

export default router;
