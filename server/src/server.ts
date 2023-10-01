import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import app from "./app";

let mongoUrl = process.env.MONGODB_URL!;
const password = process.env.PASSWORD!;

mongoUrl = mongoUrl.replace("<password>", password);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to mongodb server");
  })
  .catch((e) => {
    console.log(e);
  });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
