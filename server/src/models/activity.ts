import { Schema, Document, model } from "mongoose";

interface IActivity extends Document {
  name: string;
  imgSrc: string;
  imgAlt: string;
}

const activitySchema = new Schema<IActivity>({
  name: String,
  imgSrc: String,
  imgAlt: String,
});

export default model("Actvity", activitySchema);
