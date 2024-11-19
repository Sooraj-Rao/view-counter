// "use server";

// import {
//   EmailTemplate,
//   EmailTemplateProps,
// } from "@/components/analytics/email-template";
// import { Resend } from "resend";

// export const SendMail = async (props: EmailTemplateProps) => {
//   try {
//     const resend = new Resend(process.env.NEXT_PUBLIC_SEND_API!);
//     const { error, data } = await resend.emails.send({
//       from: process.env.SEND_FROM!,
//       to: [process.env.SEND_TO!],
//       subject: `New View - ${props?.name} `,
//       react: EmailTemplate(props),
//     });

//     if (error) {
//       console.log("Error Sending mail --> ", error);
//     } else {
//       console.log("Data mail --> ", data);
//     }
//   } catch (error) {
//     console.log("Catch Error Sending mail --> ", error);
//   }
// };

"use server";

import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES();

export const SendMail = async ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => {
  const params = {
    Source: "ytbilash@gmail.com",
    Destination: {
      ToAddresses: ["soorajrao630@gmail.com"],
    },
    Message: {
      Subject: {
        Data: `New View - ${name}`,
      },
      Body: {
        Html: {
          Data: `
            <html>
              <body>
                <h1>New View Notification</h1>
                <h4>Name: ${name}</h4>
                <h4>Url: ${url}</h4>
              </body>
            </html>
          `,
        },
      },
    },
  };

  try {
    const response = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
