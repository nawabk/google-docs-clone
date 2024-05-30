"use strict";
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
exports.autheticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
function verifyToken(token, secret, callback) {
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return callback(err, undefined);
        }
        callback(null, decoded);
    });
}
const autheticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies["token"];
        if (!token) {
            return next(new appError_1.default("You are not logged in! Please login to get access", 401));
        }
        verifyToken(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return next(new appError_1.default("Token verification failed", 401));
            }
            const userId = decoded === null || decoded === void 0 ? void 0 : decoded._id;
            const currentUser = yield userModel_1.default.findById(userId);
            if (!currentUser) {
                return next(new appError_1.default("The user belonging to this token does not exist.", 401));
            }
            req.user = currentUser;
            next();
        }));
    }
    catch (e) {
        next(e);
    }
});
exports.autheticate = autheticate;
