import { Schema, Document, model, ObjectId } from "mongoose";

interface IPlan extends Document {
  date: Date;
  activities: Array<{
    activity_id: ObjectId;
    activity_type_id: ObjectId;
    startTime: Date;
    endTime: Date;
  }>;
}
const planSchema = new Schema<IPlan>({
  date: Date,
  activities: [
    {
      activity_id: Schema.Types.ObjectId,
      activity_type_id: Schema.Types.ObjectId,
      startTime: Date,
      endTime: Date,
    },
  ],
});

export default model("Plan", planSchema);
