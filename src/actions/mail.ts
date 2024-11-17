"use server";

import {
  EmailTemplate,
  EmailTemplateProps,
} from "@/components/analytics/email-template";
import { Resend } from "resend";

export const SendMail = async (props: EmailTemplateProps) => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_SEND_API!);
    const { error, data } = await resend.emails.send({
      from: process.env.SEND_FROM!,
      to: [process.env.SEND_TO!],
      subject: `New View - ${props?.name} `,
      react: EmailTemplate(props),
    });

    if (error) {
      console.log("Error Sending mail --> ", error);
    } else {
      console.log("Data mail --> ", data);
    }
  } catch (error) {
    console.log("Catch Error Sending mail --> ", error);
  }
};
