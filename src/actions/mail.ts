"use server";

import {
  EmailTemplate,
  EmailTemplateProps,
} from "@/lib/analytics/email-template";
import { ErrorResponse, Resend } from "resend";

interface SendMailResponse {
  error: ErrorResponse | null | unknown;
}

export const SendMail = async (
  props: EmailTemplateProps
): Promise<SendMailResponse> => {
  try {
    const resend = new Resend(process.env.NEXT_PUBLIC_SEND_API!);
    const { error } = await resend.emails.send({
      from: process.env.SEND_FROM!,
      to: [process.env.SEND_TO!],
      subject: `New View - ${props?.name} `,
      react: EmailTemplate(props),
    });
    return { error };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
