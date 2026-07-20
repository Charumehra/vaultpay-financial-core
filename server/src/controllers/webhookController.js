import stripe from "../config/stripe.js";
import Invoice from "../models/Invoice.js";
import { generateReceipt } from "../utils/generateReceipt.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendReceiptEmail = async (recipientEmail, pdfPath, invoice) => {
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

export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log("Signature Verification Failed");
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const invoiceId = session.metadata.invoiceId;

    const invoice = await Invoice.findById(invoiceId);

    if (invoice) {
      invoice.status = "Paid";
      await invoice.populate("client");

      const pdfPath = await generateReceipt(invoice);

      invoice.pdfUrl = pdfPath;

      await invoice.save();
      await sendReceiptEmail(invoice.client.email, pdfPath, invoice);

      console.log("Receipt Generated:", pdfPath);
    }
  }

  res.status(200).json({
    received: true,
  });
};
