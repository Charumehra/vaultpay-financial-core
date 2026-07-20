import stripe from "../config/stripe.js";
import Invoice from "../models/Invoice.js";

export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
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

      await invoice.save();

      console.log(`Invoice ${invoice.invoiceNumber} marked as PAID`);
    }
  }

  res.status(200).json({
    received: true,
  });
};