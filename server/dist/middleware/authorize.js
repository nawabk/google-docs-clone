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
exports.authorize = void 0;
const documentModel_1 = __importDefault(require("../models/documentModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { documentId } = req.params;
        if (user) {
            const document = yield documentModel_1.default.findById(documentId);
            if (!document)
                return next(new appError_1.default("Document not found", 404));
            const isDocumentCreatedByUser = document.createdBy.toString() === user._id.toString();
            const isDocumentEditor = document.sharedWith.some((doc) => doc.user.toString() === user._id.toString() && doc.access === "Editor");
            const isAuthorized = isDocumentCreatedByUser || isDocumentEditor;
            if (!isAuthorized)
                return next(new appError_1.default("User is not authorized to perform the action", 403));
            next();
        }
    }
    catch (e) {
        next(e);
    }
});
exports.authorize = authorize;
