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
exports.createDocument = void 0;
const documentModel_1 = __importDefault(require("../models/documentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const createDocument = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name = "", userId } = req.body;
        const document = yield documentModel_1.default.create({
            name,
            createdBy: userId,
        });
        const user = yield userModel_1.default.findById(userId);
        if (!user)
            throw new appError_1.default("No user exist with the provided ID!", 404);
        res.status(201).json({
            status: "success",
            data: document,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.createDocument = createDocument;
