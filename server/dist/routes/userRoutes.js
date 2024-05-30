"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const protect_1 = require("../middleware/protect");
const validateResource_1 = require("../middleware/validateResource");
const userSchema_1 = require("../schema/request/userSchema");
const router = express_1.default.Router();
router.post("/signup", (0, validateResource_1.validateResource)(userSchema_1.createUserSchema), authController_1.signup);
router.post("/signin", (0, validateResource_1.validateResource)(userSchema_1.signInInput), authController_1.signIn);
router.patch("/:userId/verify", (0, validateResource_1.validateResource)(userSchema_1.verifyUserInput), authController_1.verifyUser);
router.post("/:userId/resend-token", (0, validateResource_1.validateResource)(userSchema_1.resendTokenInput), authController_1.resendVerificationToken);
router.get("/private", protect_1.protect, (req, res) => {
    res.send("Private accessed");
});
exports.default = router;
