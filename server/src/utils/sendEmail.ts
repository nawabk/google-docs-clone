import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

export enum EmailType {
  EMAIL_VERIFICATION,
  NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT,
}

type Props = { to: string | string[]; message: string } & (
  | {
      emailType: EmailType.EMAIL_VERIFICATION;
    }
  | {
      emailType: EmailType.NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT;
      documentId: string;
      documentTitle: string;
    }
);

function getEmailVerificationBody(message: string) {
  return `<a href=${message}><strong>Click to verify email</strong></a>`;
}

function getNotifyPeopleMessageBody(
  documentTitle: string,
  documentId: string,
  message: string
) {
  return `<div>
     <p>Hey please check the <a href=${process.env
       .CLIENT_URL!}/document/${documentId}>${documentTitle}</a></p>
     <p>${message}</p>
  </div>`;
}

export default async function (props: Props) {
  const { to, message, emailType } = props;
  try {
    let subject = "";
    let body = "";
    if (emailType === EmailType.EMAIL_VERIFICATION) {
      subject = "[TypingFight] Email Verification";
      body = getEmailVerificationBody(message);
    } else if (emailType === EmailType.NOTIFY_PEOPLE_ABOUT_SHARED_DOCUMENT) {
      const { documentTitle, documentId } = props;
      subject = "[TypingFight] Document Shared with You: Please Check";
      body = getNotifyPeopleMessageBody(documentTitle, documentId, message);
    } else {
      throw new Error("Please verify the email type!");
    }
    await resend.emails.send({
      from: "admin@typing-fight.com",
      to,
      subject,
      html: body,
    });
  } catch (e) {
    console.log(e);
  }
}
