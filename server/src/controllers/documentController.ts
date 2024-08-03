import { NextFunction, Request, Response } from "express";
import DocumentModel, { IDocument } from "../models/documentModel";
import User from "../models/userModel";
import {
  CreateDocumentSchema,
  GetDocumentSchema,
  ShareDocumenSchema,
  UpdateDocumentNameSchema,
} from "../schema/request/documentSchema";
import AppError from "../utils/appError";
import sendEmail, { EmailType } from "../utils/sendEmail";
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

export const getDocumentList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) return new AppError("User Not Found", 404);
    const documents = await DocumentModel.find<IDocument>({
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
  } catch (e) {
    next(e);
  }
};

export const getDocument = async (
  req: Request<GetDocumentSchema["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params;
    const document = await DocumentModel.findById<IDocument>(documentId);
    res.status(200).json({
      status: "success",
      data: document,
    });
  } catch (e) {
    next(e);
  }
};

export const updateDocumentName = async (
  req: Request<
    UpdateDocumentNameSchema["params"],
    {},
    UpdateDocumentNameSchema["body"]
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params;
    const { name } = req.body;
    const updatedDocument = await DocumentModel.findByIdAndUpdate(
      { _id: documentId },
      { name }
    );
    res.status(200).json({
      status: "success",
      data: updatedDocument,
    });
  } catch (e) {
    next(e);
  }
};

function emailPeopleWithNoticationMessage(
  users: ShareDocumenSchema["body"]["sharedWith"],
  notificationMessage: string,
  documentId: string,
  documentTitle: string
) {
  try {
    const emails = users.map((user) => user.email);
    console.log(emails);
    sendEmail({
      emailType: EmailType.NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT,
      to: emails[0],
      documentTitle,
      documentId,
      message: notificationMessage,
    });
  } catch (e) {
    console.log(e);
  }
}

export const sharedDocument = async (
  req: Request<ShareDocumenSchema["params"], {}, ShareDocumenSchema["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params;
    const { sharedWith, notifyPeople, notificationMessage, documentTitle } =
      req.body;
    const sharedWithUserIdAndAccess = sharedWith.map((elem) => ({
      user: elem.user,
      access: elem.access,
    }));
    if (notifyPeople)
      emailPeopleWithNoticationMessage(
        sharedWith,
        notificationMessage,
        documentId,
        documentTitle
      );
    const updatedDocument = await DocumentModel.findByIdAndUpdate(
      { _id: documentId },
      { $push: { sharedWith: { $each: sharedWithUserIdAndAccess } } }
    );
    res.status(201).json({
      type: "success",
      data: updatedDocument,
    });
  } catch (e) {
    next(e);
  }
};
