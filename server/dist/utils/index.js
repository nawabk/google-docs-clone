"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
exports.isValidBody = isValidBody;
const validateEmail = (email) => {
    return !!String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.validateEmail = validateEmail;
function isValidBody(body, fields) {
    return fields.every((field) => field in body);
}
