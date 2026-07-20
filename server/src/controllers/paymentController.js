import stripe from "../config/stripe.js";
import Invoice from "../models/Invoice.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    // Find invoice and populate client details
    const invoice = await Invoice.findById(invoiceId).populate("client");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    // Prevent duplicate payment
    if (invoice.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Invoice already paid",
      });
    }

    // Client can pay only their own invoice
    if (
      req.user.role === "client" &&
      invoice.client._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      customer_email: invoice.client.email,

      metadata: {
        invoiceId: invoice._id.toString(),
      },

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: invoice.description,
            },

            unit_amount: invoice.amount * 100, // Stripe accepts cents
          },

          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    // Save Stripe Session ID
    invoice.stripeSessionId = session.id;
    await invoice.save();

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};