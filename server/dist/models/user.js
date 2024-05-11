"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    role_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
