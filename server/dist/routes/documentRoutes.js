"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentController_1 = require("../controllers/documentController");
const authorize_1 = require("../middleware/authorize");
const protect_1 = require("../middleware/protect");
const validateResource_1 = require("../middleware/validateResource");
const documentSchema_1 = require("../schema/request/documentSchema");
const documentRoutes = (0, express_1.Router)();
documentRoutes
    .route("/")
    .post(protect_1.protect, (0, validateResource_1.validateResource)(documentSchema_1.createDocumentSchema), documentController_1.createDocument)
    .get(protect_1.protect, documentController_1.getDocumentList);
documentRoutes.get("/:documentId", protect_1.protect, authorize_1.authorize, (0, validateResource_1.validateResource)(documentSchema_1.getDocumentSchema), documentController_1.getDocument);
documentRoutes.patch("/:documentId", protect_1.protect, authorize_1.authorize, (0, validateResource_1.validateResource)(documentSchema_1.updateDocumentNameSchema), documentController_1.updateDocumentName);
documentRoutes.post("/:documentId/share", protect_1.protect, authorize_1.authorize, (0, validateResource_1.validateResource)(documentSchema_1.shareDocumenSchema), documentController_1.sharedDocument);
exports.default = documentRoutes;
