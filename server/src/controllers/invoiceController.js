import Invoice from "../models/Invoice.js";
import User from "../models/User.js";
import fs from "fs";

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

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      client: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: invoices.length,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    let invoice;

    if (req.user.role === "admin") {
      invoice = await Invoice.findById(req.params.id).populate(
        "client",
        "name email",
      );
    } else {
      invoice = await Invoice.findOne({
        _id: req.params.id,
        client: req.user._id,
      }).populate("client", "name email");
    }

    if (!invoice) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    res.json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    res.json({
      success: true,
      message: "Invoice updated successfully.",
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    await invoice.deleteOne();

    res.json({
      success: true,
      message: "Invoice deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRevenue = async (req, res) => {
  try {
    const revenue = await Invoice.aggregate([
      {
        $match: {
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
          totalInvoices: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json({
      success: true,
      revenue: revenue[0] || {
        totalRevenue: 0,
        totalInvoices: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const downloadReceipt = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("client");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
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

    if (!invoice.pdfUrl || !fs.existsSync(invoice.pdfUrl)) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found",
      });
    }

    return res.download(invoice.pdfUrl, `${invoice.invoiceNumber}.pdf`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
