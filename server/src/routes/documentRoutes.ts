import { Router } from "express";
import { createDocument } from "../controllers/documentController";
import { protect } from "../middleware/protect";
import { validateResource } from "../middleware/validateResource";
import { createDocumentSchema } from "../schema/request/documentSchema";

const documentRoutes = Router();

documentRoutes.post(
  "/",
  protect,
  validateResource(createDocumentSchema),
  createDocument
);

export default documentRoutes;
