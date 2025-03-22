
import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'admin@pemblebox.com',
    pass: process.env.EMAIL_PASSWORD // You'll need to set this in your environment variables
  }
});

export const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: 'admin@pemblebox.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
