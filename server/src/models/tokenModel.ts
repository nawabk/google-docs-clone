import mongoose, { ObjectId, Schema, Document } from "mongoose";
import crypto from "crypto";

export interface IToken extends Document {
  userId: ObjectId;
  token: string;
  expireAt: Date;
}

const tokenSchema: Schema = new mongoose.Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
  },
  expireAt: {
    type: Date,
    expires: 60,
    default: Date.now(),
  },
});

tokenSchema.pre<IToken>("save", function (next) {
  this.token = crypto.randomBytes(32).toString("hex");
  next();
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
