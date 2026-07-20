import stripe from "../config/stripe.js";
import Invoice from "../models/Invoice.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    const invoice = await Invoice.findById(invoiceId).populate("client");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (invoice.status === "Paid") {
      return res.status(400).json({
        success: false,
        message: "Invoice already paid",
      });
    }

    if (
      req.user.role === "client" &&
      invoice.client._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      customer_email: invoice.client.email,

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: invoice.description,
            },

            unit_amount: invoice.amount * 100,
          },

          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    invoice.stripeSessionId = session.id;

    await invoice.save();

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};