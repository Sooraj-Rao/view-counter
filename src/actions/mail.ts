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
  userIp,
}: {
  name: string;
  url: string;
  userIp: string | undefined;
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
                <h4>User IP: ${userIp}</h4>
              </body>
            </html>
          `,
        },
      },
    },
  };

  try {
    const response = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", response.MessageId);
    return response.MessageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
