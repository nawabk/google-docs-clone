import mongoose, { ObjectId, Schema } from "mongoose";

export interface IDocument extends Document {
  name: string;
  createdBy: ObjectId;
  sharedWith: Array<ObjectId>;
}

const documentSchema: Schema = new mongoose.Schema<IDocument>(
  {
    name: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const DocumentModel = mongoose.model("Document", documentSchema);

export default DocumentModel;
