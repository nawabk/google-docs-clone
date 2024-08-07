"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.searchUsers = exports.logout = exports.signIn = exports.resendVerificationToken = exports.verifyUser = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendEmail_1 = __importStar(require("../utils/sendEmail"));
exports.signup = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.default.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    const newToken = (yield tokenModel_1.default.create({ userId: newUser._id }));
    const message = `${process.env.CLIENT_URL}/verify_email?userId=${newUser._id}&token=${newToken.token}`;
    (0, sendEmail_1.default)({
        to: newUser.email,
        message,
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
        const message = `${process.env.CLIENT_URL}/verify_email?userId=${user._id}&token=${newToken.token}`;
        yield (0, sendEmail_1.default)({
            to: user.email,
            message,
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
const signToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            throw new appError_1.default("User does not exist.", 400);
        if (!user.isEmailVerified)
            throw new appError_1.default("Please verify the user.", 400);
        if (!(yield user.verifyPassword(user.password, password))) {
            throw new appError_1.default("Password is Incorrect!", 400);
        }
        const token = signToken(user._id);
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
            .status(200)
            .json({
            status: "success",
            data: {
                username: user.username,
                _id: user._id,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
            },
        });
    }
    catch (e) {
        next(e);
    }
});
exports.signIn = signIn;
const logout = (req, res, next) => {
    try {
        res.clearCookie("token").status(200).json({
            status: "success",
            data: "Logout successfully!",
        });
    }
    catch (e) {
        next(e);
    }
};
exports.logout = logout;
const searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { text, limit = "10", page = "1" } = req.query;
        const limitInNumber = +limit;
        const pageInNumber = +page;
        if (isNaN(limitInNumber) || isNaN(pageInNumber)) {
            throw new appError_1.default("Please provide limit or page in number.", 400);
        }
        const skip = (pageInNumber - 1) * limitInNumber;
        // const allUsers = await User.find<IUser>({
        //   $or: [
        //     { email: { $regex: text, $options: "i" } },
        //     { username: { $regex: text, $options: "i" } },
        //   ],
        // })
        //   .limit(limitInNumber)
        //   .skip(skip);
        // const result = await User.aggregate([
        //   {
        //     $match: {
        //       $or: [
        //         { email: { $regex: text, $options: "i" } },
        //         { username: { $regex: text, $options: "i" } },
        //       ],
        //     },
        //   },
        //   {
        //     $facet: {
        //       totalCount: [{ $count: "count" }],
        //       paginatedResuls: [{ $skip: skip }, { $limit: limitInNumber }],
        //     },
        //   },
        // ]);
        const result = yield userModel_1.default.aggregate()
            .project({
            _id: 1,
            email: 1,
            emailPrefix: { $arrayElemAt: [{ $split: ["$email", "@"] }, 0] },
            username: 1,
        })
            .match({
            $and: [
                { email: { $ne: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email } },
                {
                    $or: [
                        { emailPrefix: { $regex: text, $options: "i" } },
                        { username: { $regex: text, $options: "i" } },
                    ],
                },
            ],
        })
            .project({
            email: 1,
            username: 1,
        })
            .facet({
            totalCount: [{ $count: "count" }],
            paginatedResuls: [{ $skip: skip }, { $limit: limitInNumber }],
        });
        const paginatedResuls = result[0]
            .paginatedResuls;
        const totalCount = ((_c = (_b = result[0].totalCount[0]) === null || _b === void 0 ? void 0 : _b.count) !== null && _c !== void 0 ? _c : 0);
        const totalPage = totalCount === 0 ? 0 : Math.ceil(totalCount / limitInNumber);
        res.status(200).json({
            status: "success",
            currPage: pageInNumber,
            totalPage,
            data: paginatedResuls,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.searchUsers = searchUsers;
