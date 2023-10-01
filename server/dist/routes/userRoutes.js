"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validateResource_1 = require("../middleware/validateResource");
const userSchema_1 = require("../schema/userSchema");
const router = express_1.default.Router();
router.patch("/verify", authController_1.verifyUser);
router.post("/", validateResource_1.validateResource(userSchema_1.createUserSchema), authController_1.signup);
exports.default = router;
