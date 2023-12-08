import { Schema, Document, model } from "mongoose";

interface IActivityType extends Document {
  name: string;
  imgSrc: string;
  imgAlt: string;
}
const activityTypeSchema = new Schema<IActivityType>({
  name: {
    type: String,
    enum: [
      "event",
      "celebration",
      "trip",
      "with_caregivers",
      "meal",
      "playtime",
      "others",
    ],
  },
  imgSrc: String,
  imgAlt: String,
});

export default model("ActivityType", activityTypeSchema);
