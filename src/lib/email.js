
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
// You'll need to set this in your environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  const msg = {
    to,
    from: 'your-verified-sender@example.com', // Replace with your verified sender
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
