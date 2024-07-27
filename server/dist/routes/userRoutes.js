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
const appError_1 = __importDefault(require("../utils/appError"));
const router = express_1.default.Router();
router.post("/signup", (0, validateResource_1.validateResource)(userSchema_1.createUserSchema), authController_1.signup);
router.post("/signin", (0, validateResource_1.validateResource)(userSchema_1.signInInput), authController_1.signIn);
router.patch("/:userId/verify", (0, validateResource_1.validateResource)(userSchema_1.verifyUserInput), authController_1.verifyUser);
router.post("/:userId/resend-token", (0, validateResource_1.validateResource)(userSchema_1.resendTokenInput), authController_1.resendVerificationToken);
router.get("/validate", protect_1.protect, (req, res, next) => {
    const currentUser = req.user;
    if (!currentUser)
        return next(new appError_1.default("No User found", 400));
    res.status(200).json({
        status: "success",
        data: {
            _id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            isEmailVerified: currentUser.isEmailVerified,
        },
    });
});
router.get("/logout", authController_1.logout);
router.get("/search", protect_1.protect, (0, validateResource_1.validateResource)(userSchema_1.searchUsersSchema), authController_1.searchUsers);
exports.default = router;
