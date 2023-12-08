import { ObjectId, Document, Schema, model } from "mongoose";

interface IUser extends Document {
  username: string;
  role_id: ObjectId;
}
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  role_id: {
    type: Schema.Types.ObjectId,
  },
});
const User = model("User", userSchema);
export default User;
