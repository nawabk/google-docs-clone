import { NextFunction, Request, Response } from "express";
import DocumentModel, { IDocument } from "../models/documentModel";
import { DocumentIdParams } from "../schema/request/documentSchema";
import AppError from "../utils/appError";

export const authorize = async (
  req: Request<DocumentIdParams["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const { documentId } = req.params;
    if (user) {
      const document = await DocumentModel.findById<IDocument>(documentId);
      if (!document) return next(new AppError("Document not found", 404));
      const isDocumentCreatedByUser =
        document.createdBy.toString() === user._id.toString();
      const isDocumentEditor = document.sharedWith.some(
        (doc) =>
          doc.user.toString() === user._id.toString() && doc.access === "Editor"
      );
      const isAuthorized = isDocumentCreatedByUser || isDocumentEditor;

      if (!isAuthorized)
        return next(
          new AppError("User is not authorized to perform the action", 403)
        );

      next();
    }
  } catch (e) {
    next(e);
  }
};
