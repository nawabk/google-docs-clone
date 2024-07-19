import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IDocument extends Document {
  name: string;
  createdBy: ObjectId;
  sharedWith: Array<{
    user: ObjectId;
    access: "Editor" | "Viewer";
  }>;
  content: string;
}

const documentSchema: Schema = new mongoose.Schema<IDocument>(
  {
    name: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sharedWith: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        access: {
          type: String,
          enum: ["Editor", "Viewer"],
          default: "Viewer",
        },
      },
    ],
    content: String,
  },
  { timestamps: true }
);

const DocumentModel = mongoose.model("Document", documentSchema);

export default DocumentModel;
