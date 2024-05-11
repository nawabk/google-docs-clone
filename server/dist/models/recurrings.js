"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recurringSchema = new mongoose_1.Schema({
    activities_id: mongoose_1.Schema.Types.ObjectId,
    activities_type: mongoose_1.Schema.Types.ObjectId,
    day: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
});
exports.default = (0, mongoose_1.model)("Recurring", recurringSchema);
