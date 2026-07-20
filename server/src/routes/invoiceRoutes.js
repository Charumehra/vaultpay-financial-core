import express from "express";
import {
  createInvoice,
  getAllInvoices,
  getMyInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  getRevenue,
} from "../controllers/invoiceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createInvoice);
router.get("/", protect, authorize("admin"), getAllInvoices);
router.get("/revenue", protect, authorize("admin"), getRevenue);
router.put("/:id", protect, authorize("admin"), updateInvoice);
router.delete("/:id", protect, authorize("admin"), deleteInvoice);

router.get("/my", protect, authorize("client"), getMyInvoices);

router.get("/:id", protect, getInvoiceById);

export default router;