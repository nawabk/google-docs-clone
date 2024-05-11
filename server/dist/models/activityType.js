"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activityTypeSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)("ActivityType", activityTypeSchema);
