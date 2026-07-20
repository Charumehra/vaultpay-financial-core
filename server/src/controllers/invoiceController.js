import Invoice from "../models/Invoice.js";
import User from "../models/User.js";

export const createInvoice = async (req, res) => {
  try {
    const { clientId, amount, description } = req.body;

    const client = await User.findById(clientId);

    if (!client || client.role !== "client") {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await Invoice.create({
      invoiceNumber,
      client: clientId,
      amount,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};