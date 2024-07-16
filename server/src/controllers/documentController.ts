import { NextFunction, Request, Response } from "express";
import DocumentModel, { IDocument } from "../models/documentModel";
import User from "../models/userModel";
import { CreateDocumentSchema } from "../schema/request/documentSchema";
import AppError from "../utils/appError";
export const createDocument = async (
  req: Request<{}, {}, CreateDocumentSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name = "", userId } = req.body;
    const document = await DocumentModel.create<IDocument>({
      name,
      createdBy: userId,
    });
    const user = await User.findById(userId);
    if (!user) throw new AppError("No user exist with the provided ID!", 404);
    res.status(201).json({
      status: "success",
      data: document,
    });
  } catch (e) {
    next(e);
  }
};
