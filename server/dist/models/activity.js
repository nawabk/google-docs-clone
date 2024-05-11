"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    name: String,
    imgSrc: String,
    imgAlt: String,
});
exports.default = (0, mongoose_1.model)("Actvity", activitySchema);
