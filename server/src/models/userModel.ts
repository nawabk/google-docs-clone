import bcyrpt from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";
import { validateEmail } from "../utils";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  isEmailVerified?: boolean;
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
    min: [6, "Password length should be 6"],
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (value: string) {
        const user = this as IUser;
        return value === user.password;
      },
      message: "Password Confirm does not match with password",
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
});

schema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  // hash the password
  this.password = await bcyrpt.hash(this.password, 12);
  // remove the passwordConfirm field from the module
  this.passwordConfirm = undefined;
  next();
});

schema.methods.verifyPassword = async function (
  userPassword: string,
  candidatePassword: string
) {
  return bcyrpt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", schema);

export default User;
