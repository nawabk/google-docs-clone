import express from "express";
import { signup } from "../controllers/authController";

const router = express.Router();

router.post("/", signup);

export default router;
