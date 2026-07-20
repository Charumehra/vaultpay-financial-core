import express from "express";
import { createInvoice } from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createInvoice
);

export default router;