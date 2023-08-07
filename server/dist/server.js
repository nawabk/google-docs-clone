"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
let mongoUrl = process.env.MONGODB_URL;
const password = process.env.PASSWORD;
mongoUrl = mongoUrl.replace("<password>", password);
mongoose_1.default
    .connect(mongoUrl)
    .then(() => {
    console.log("Connected to mongodb server");
})
    .catch((e) => {
    console.log(e);
});
const PORT = process.env.PORT || 8000;
app_1.default.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});
