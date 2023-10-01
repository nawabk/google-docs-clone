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
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        lowercase: true,
        validate: {
            validator(value) {
                if (typeof value === "string")
                    return utils_1.validateEmail(value);
                return false;
            },
            message: "Please provide a valid email id",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        min: [6, "Password length should be 6"],
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (value) {
                const user = this;
                return value === user.password;
            },
            message: "Password Confirm does not match with password",
        },
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
});
schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        // hash the password
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        // remove the passwordConfirm field from the module
        this.passwordConfirm = undefined;
        next();
    });
});
const User = mongoose_1.default.model("User", schema);
exports.default = User;
