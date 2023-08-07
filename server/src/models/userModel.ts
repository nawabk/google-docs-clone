import mongoose, { Schema, Document, InferSchemaType } from "mongoose";
import { validateEmail } from "../utils";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  age: number;
}

const schema: Schema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    lowercase: true,
    validate: {
      validator(value: any) {
        if (typeof value === "string") return validateEmail(value);
        return false;
      },
      message: "Please provide a valid email id",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    min: [8, "Password length should be 8"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (value: string) {
        const user = this as IUser;
        return value === user.password;
      },
    },
  },
});

const User = mongoose.model("User", schema);
schema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.passwordConfirm = undefined;
  next();
});

export default User;
