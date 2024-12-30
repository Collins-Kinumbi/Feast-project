import nodemailer from "nodemailer";

async function sendEmail(option) {
  let transporter;

  if (process.env.NODE_ENV === "development") {
    // Use Mailtrap for development
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  } else {
    // Use Gmail for production
    transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  // Define email options
  const emailOptions = {
    from: "Feast Support <support@feast.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  // Send the email
  try {
    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}

export default sendEmail;
