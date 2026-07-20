import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateReceipt = (invoice) => {
  return new Promise((resolve, reject) => {
    const receiptsDir = path.join(process.cwd(), "receipts");

    if (!fs.existsSync(receiptsDir)) {
      fs.mkdirSync(receiptsDir, { recursive: true });
    }

    const fileName = `${invoice.invoiceNumber}.pdf`;
    const filePath = path.join(receiptsDir, fileName);

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc
      .fontSize(24)
      .text("Nexus Corporate Services", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(18)
      .fillColor("green")
      .text("PAYMENT RECEIPT", {
        align: "center",
      });

    doc.moveDown(2);

    doc.fillColor("black");

    doc.text(`Invoice Number : ${invoice.invoiceNumber}`);
    doc.text(`Client         : ${invoice.client.name}`);
    doc.text(`Email          : ${invoice.client.email}`);
    doc.text(`Amount         : $${invoice.amount}`);
    doc.text(`Description    : ${invoice.description}`);
    doc.text(`Status         : ${invoice.status}`);

    doc.moveDown(2);

    doc
      .fontSize(28)
      .fillColor("red")
      .text("PAID", {
        align: "center",
      });

    doc.end();

    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", reject);
  });
};