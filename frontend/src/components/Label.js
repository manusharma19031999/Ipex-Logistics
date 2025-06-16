import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Label.css";

function Label({ formData, onEdit }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generatePDF = async () => {
      try {
        const res = await axios.post(
          "https://ipex-logistics-backend.onrender.com/generate-label",
          formData,
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );
        setPdfUrl(url);
        setLoading(false);
      } catch (err) {
        console.error("Error generating PDF", err);
        setLoading(false);
      }
    };

    generatePDF();
  }, [formData]);

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "label.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="label-preview">
      <h3>Delivery Label Preview</h3>

      {loading ? (
        <p>Generating PDF…</p>
      ) : (
        <>
          <iframe
  src={pdfUrl}
  type="application/pdf"
  width="100%"
  height="500px"
  title="PDF Preview"
/>

          <div style={{ marginTop: "10px" }}>
            <button onClick={downloadPDF}>Download PDF</button>
            <button onClick={onEdit} style={{ marginLeft: 8 }}>
              Edit Details
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Label;
