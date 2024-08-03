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
    EmailType[EmailType["NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT"] = 1] = "NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT";
})(EmailType || (exports.EmailType = EmailType = {}));
function getEmailVerificationBody(message) {
    return `<a href=${message}><strong>Click to verify email</strong></a>`;
}
function getNotifyPeopleMessageBody(documentTitle, documentId, message) {
    return `<div>
     <p>Hey please check the <a href=${process.env
        .CLIENT_URL}/document/${documentId}>${documentTitle}</a></p>
     <p>${message}</p>
  </div>`;
}
function default_1(props) {
    return __awaiter(this, void 0, void 0, function* () {
        const { to, message, emailType } = props;
        try {
            let subject = "";
            let body = "";
            if (emailType === EmailType.EMAIL_VERIFICATION) {
                subject = "[TypingFight] Email Verification";
                body = getEmailVerificationBody(message);
            }
            else if (emailType === EmailType.NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT) {
                const { documentTitle, documentId } = props;
                subject = "[TypingFight] Document Shared with You: Please Check";
                body = getNotifyPeopleMessageBody(documentTitle, documentId, message);
            }
            else {
                throw new Error("Please verify the email type!");
            }
            yield resend.emails.send({
                from: "admin@typing-fight.com",
                to,
                subject,
                html: body,
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
