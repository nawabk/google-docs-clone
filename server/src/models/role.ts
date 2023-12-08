import mongoose, { Schema, Document } from "mongoose";

interface IRole extends Document {
  name: string;
}
const roleSchema = new Schema<IRole>({
  name: {
    type: String,
  },
});
const Role = mongoose.model("Role", roleSchema);
export default Role;
