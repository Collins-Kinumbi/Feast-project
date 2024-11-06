import nodemailer from "nodemailer";

async function sendEmail(option) {
  // Create a transpoter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Define email options
  const emailOptions = {
    from: "Feast support<support@feast.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions); //Send the email
}

export default sendEmail;
