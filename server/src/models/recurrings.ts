import { Schema, Document, model, ObjectId } from "mongoose";

interface IRecurring extends Document {
  activities_id: ObjectId;
  activities_type: ObjectId;
  day: string;
}

const recurringSchema = new Schema<IRecurring>({
  activities_id: Schema.Types.ObjectId,
  activities_type: Schema.Types.ObjectId,
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
});

export default model("Recurring", recurringSchema);
