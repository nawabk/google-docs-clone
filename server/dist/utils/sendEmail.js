"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailType = void 0;
exports.default = default_1;
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.RESEND_API);
var EmailType;
(function (EmailType) {
    EmailType[EmailType["EMAIL_VERIFICATION"] = 0] = "EMAIL_VERIFICATION";
})(EmailType || (exports.EmailType = EmailType = {}));
function default_1(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, message, emailType }) {
        try {
            let subject = "";
            let body = "";
            if (emailType === EmailType.EMAIL_VERIFICATION) {
                subject = getEmailVerificationSubject();
                const url = "";
                body = `<a href=${message}><strong>Click to verify email</strong></a>`;
            }
            const data = yield resend.emails.send({
                from: "admin@typing-fight.com",
                to,
                subject: "[TypingFight] Email Verification",
                html: body,
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
function getEmailVerificationSubject() {
    return "Email verification";
}
