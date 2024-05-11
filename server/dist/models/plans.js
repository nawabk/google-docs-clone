"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    date: Date,
    activities: [
        {
            activity_id: mongoose_1.Schema.Types.ObjectId,
            activity_type_id: mongoose_1.Schema.Types.ObjectId,
            startTime: Date,
            endTime: Date,
        },
    ],
});
exports.default = (0, mongoose_1.model)("Plan", planSchema);
