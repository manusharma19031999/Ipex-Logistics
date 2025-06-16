// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generatePDF = require("./generatePDF");

const app = express();
const PORT = 5000;

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.post("/generate-label", async (req, res) => {
  try {
    const { senderName, senderAddress, receiverName, receiverAddress } =
      req.body;
    const deliveryId = "DEL-" + Math.floor(100000 + Math.random() * 900000);

    const pdfBuffer = await generatePDF({
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      deliveryId,
    });

    res.writeHead(200, {
  "Content-Type": "application/pdf",
  "Content-Disposition": "inline; filename=label.pdf",
  "Content-Length": pdfBuffer.length,
});
res.end(pdfBuffer);

  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});
app.listen(PORT, () =>
  console.log(`Backend running at http://localhost:${PORT}`)
);
