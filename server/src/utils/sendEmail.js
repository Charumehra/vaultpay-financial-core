import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReceiptEmail = async (
  recipientEmail,
  pdfPath,
  invoice
) => {
  try {
    await transporter.sendMail({
      from: `"Nexus Corporate Services" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Payment Receipt - ${invoice.invoiceNumber}`,
      html: `
        <h2>Payment Successful</h2>

        <p>Hello ${invoice.client.name},</p>

        <p>Thank you for your payment.</p>

        <p><strong>Invoice:</strong> ${invoice.invoiceNumber}</p>

        <p><strong>Amount:</strong> $${invoice.amount}</p>

        <p>Your receipt is attached to this email.</p>

        <br/>

        <p>Regards,</p>
        <p>Nexus Corporate Services</p>
      `,
      attachments: [
        {
          filename: `${invoice.invoiceNumber}.pdf`,
          path: pdfPath,
        },
      ],
    });

    console.log("Receipt email sent successfully");
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};