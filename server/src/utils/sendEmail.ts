import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export enum EmailType {
  EMAIL_VERIFICATION,
}

type Props = {
  to: string | string[];
  message: string;
  emailType: EmailType;
};

export default async function ({ to, message, emailType }: Props) {
  try {
    let subject = "";
    let body = "";
    if (emailType === EmailType.EMAIL_VERIFICATION) {
      subject = getEmailVerificationSubject();
      const url = "";
      body = `<a href=${message}><strong>Click to verify email</strong></a>`;
    }
    const data = await resend.emails.send({
      from: "admin@typing-fight.com",
      to,
      subject: "[TypingFight] Email Verification",
      html: body,
    });
  } catch (e) {
    console.log(e);
  }
}

function getEmailVerificationSubject() {
  return "Email verification";
}
