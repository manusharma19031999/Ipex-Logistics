// generatePDF.js
const PDFDocument = require("pdfkit");
const bwipjs = require("bwip-js");

function generatePDF({
  senderName,
  senderAddress,
  receiverName,
  receiverAddress,
  deliveryId,
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", (data) => buffers.push(data));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Generate Barcode as PNG buffer
      const barcodeBuffer = await bwipjs.toBuffer({
        bcid: "code128", // Barcode type
        text: deliveryId, // Text to encode
        scale: 3, // 3x scaling factor
        height: 10, // Bar height, in mm
        includetext: true, // Show human-readable text
        textxalign: "center", // Align text to center
      });

      // Add title
      doc
        .fontSize(18)
        .text("Delivery Label", { align: "center" })
        .moveDown(1.5);

      // Add Date/Time
      const now = new Date();
      const dateStr = now.toLocaleString();
      doc
        .fontSize(10)
        .text(`Generated on: ${dateStr}`, { align: "right" })
        .moveDown();

      // Delivery ID
      doc.fontSize(12).text(`Delivery ID: ${deliveryId}\n`);

      // Sender
      doc.text("Sender:").text(senderName).text(senderAddress).moveDown();

      // Receiver
      doc.text("Receiver:").text(receiverName).text(receiverAddress).moveDown();

      // Add barcode
      doc.image(barcodeBuffer, {
        fit: [250, 80],
        align: "center",
        valign: "center",
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = generatePDF;
