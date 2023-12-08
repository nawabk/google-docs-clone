"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.resendVerificationToken = exports.verifyUser = exports.signup = void 0;
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendEmail_1 = __importStar(require("../utils/sendEmail"));
const constants_1 = require("../constants");
const appError_1 = __importDefault(require("../utils/appError"));
exports.signup = catchAsync_1.default((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = (yield userModel_1.default.create(req.body));
    const newToken = (yield tokenModel_1.default.create({ userId: newUser._id }));
    sendEmail_1.default({
        to: newUser.email,
        message: newToken.token,
        emailType: sendEmail_1.EmailType.EMAIL_VERIFICATION,
    });
    res.status(201).json({
        status: "success",
        data: newUser,
    });
}));
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield tokenModel_1.default.findOne({
            userId: req.params.userId,
            token: req.body.token,
        });
        if (!token) {
            return res.status(400).json({
                status: "error",
                message: constants_1.ERROR_MESSAGE.INVALID_EMAIL_VERIFICATION,
            });
        }
        yield userModel_1.default.updateOne({ _id: req.params.userId }, { isEmailVerified: true });
        res
            .status(201)
            .json({ status: "success", message: "Your email is verified" });
    }
    catch (e) {
        next(e);
    }
});
exports.verifyUser = verifyUser;
const resendVerificationToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (yield userModel_1.default.findOne({ _id: req.params.userId }));
        if (!user)
            return next(new appError_1.default("User doest not exist", 404));
        const newToken = (yield tokenModel_1.default.create({ userId: user._id }));
        yield sendEmail_1.default({
            to: user.email,
            message: newToken.token,
            emailType: sendEmail_1.EmailType.EMAIL_VERIFICATION,
        });
        res.status(201).json({
            status: "success",
            message: "Another verification link has been sent to your email address.",
        });
    }
    catch (e) {
        next(e);
    }
});
exports.resendVerificationToken = resendVerificationToken;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            throw new appError_1.default("User does not exist.", 400);
        if (!user.isEmailVerified)
            throw new appError_1.default("Please verify the user.", 400);
        res.send(200).json({
            status: "success",
            message: "Well Done!",
        });
    }
    catch (e) {
        next(e);
    }
});
exports.signIn = signIn;
