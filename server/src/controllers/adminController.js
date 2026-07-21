import Invoice from "../models/Invoice.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalInvoices = await Invoice.countDocuments();

    const totalClients = await User.countDocuments({
      role: "client",
    });

    const pendingInvoices = await Invoice.countDocuments({
      status: "Pending",
    });

    const paidInvoices = await Invoice.find({
      status: "Paid",
    });

    const revenue = paidInvoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0
    );

    const recentInvoices = await Invoice.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        revenue,
        totalInvoices,
        totalClients,
        pendingInvoices,
      },
      recentInvoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};