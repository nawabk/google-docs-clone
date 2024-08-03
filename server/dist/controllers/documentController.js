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
exports.sharedDocument = exports.updateDocumentName = exports.getDocument = exports.getDocumentList = exports.createDocument = void 0;
const documentModel_1 = __importDefault(require("../models/documentModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const sendEmail_1 = __importStar(require("../utils/sendEmail"));
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
const getDocumentList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            return new appError_1.default("User Not Found", 404);
        const documents = yield documentModel_1.default.find({
            $or: [
                {
                    createdBy: user._id,
                },
                { "sharedWith.user": user._id },
            ],
        });
        res.status(200).json({
            status: "success",
            data: documents,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getDocumentList = getDocumentList;
const getDocument = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId } = req.params;
        const document = yield documentModel_1.default.findById(documentId);
        res.status(200).json({
            status: "success",
            data: document,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.getDocument = getDocument;
const updateDocumentName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId } = req.params;
        const { name } = req.body;
        const updatedDocument = yield documentModel_1.default.findByIdAndUpdate({ _id: documentId }, { name });
        res.status(200).json({
            status: "success",
            data: updatedDocument,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.updateDocumentName = updateDocumentName;
function emailPeopleWithNoticationMessage(users, notificationMessage, documentId, documentTitle) {
    try {
        const emails = users.map((user) => user.email);
        console.log(emails);
        (0, sendEmail_1.default)({
            emailType: sendEmail_1.EmailType.NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT,
            to: emails[0],
            documentTitle,
            documentId,
            message: notificationMessage,
        });
    }
    catch (e) {
        console.log(e);
    }
}
const sharedDocument = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documentId } = req.params;
        const { sharedWith, notifyPeople, notificationMessage, documentTitle } = req.body;
        const sharedWithUserIdAndAccess = sharedWith.map((elem) => ({
            user: elem.user,
            access: elem.access,
        }));
        if (notifyPeople)
            emailPeopleWithNoticationMessage(sharedWith, notificationMessage, documentId, documentTitle);
        const updatedDocument = yield documentModel_1.default.findByIdAndUpdate({ _id: documentId }, { $push: { sharedWith: { $each: sharedWithUserIdAndAccess } } });
        res.status(201).json({
            type: "success",
            data: updatedDocument,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.sharedDocument = sharedDocument;
