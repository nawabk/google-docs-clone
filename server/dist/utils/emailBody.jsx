"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerification = void 0;
const heading_1 = require("@react-email/heading");
const html_1 = require("@react-email/html");
const container_1 = require("@react-email/container");
const button_1 = require("@react-email/button");
function EmailVerification() {
    return (<html_1.Html>
      <container_1.Container>
        <heading_1.Heading as="h2">Typing Fight : Verify your email</heading_1.Heading>
        <button_1.Button>Verify your email</button_1.Button>
      </container_1.Container>
    </html_1.Html>);
}
exports.EmailVerification = EmailVerification;
