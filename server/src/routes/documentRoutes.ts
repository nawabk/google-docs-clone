import { Router } from "express";
import {
  createDocument,
  getDocument,
  getDocumentList,
  sharedDocument,
  updateDocumentName,
} from "../controllers/documentController";
import { authorize } from "../middleware/authorize";
import { protect } from "../middleware/protect";
import { validateResource } from "../middleware/validateResource";
import {
  createDocumentSchema,
  getDocumentSchema,
  shareDocumenSchema,
  updateDocumentNameSchema,
} from "../schema/request/documentSchema";

const documentRoutes = Router();

documentRoutes
  .route("/")
  .post(protect, validateResource(createDocumentSchema), createDocument)
  .get(protect, getDocumentList);

documentRoutes.get(
  "/:documentId",
  protect,
  authorize,
  validateResource(getDocumentSchema),
  getDocument
);

documentRoutes.patch(
  "/:documentId",
  protect,
  authorize,
  validateResource(updateDocumentNameSchema),
  updateDocumentName
);

documentRoutes.post(
  "/:documentId/share",
  protect,
  authorize,
  validateResource(shareDocumenSchema),
  sharedDocument
);

export default documentRoutes;
