import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";

function ExportButton() {
  const hasExported = useRef(false);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfPages = document.querySelectorAll(".pdf-page-section");

    for (let i = 0; i < pdfPages.length; i++) {
      const canvas = await html2canvas(pdfPages[i], {
        scale: 2,
        useCORS: true,
      });

      const margin = 20;

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i !== 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
    }

    pdf.save("monthly-attendance-report.pdf");
  };

  useEffect(() => {
    if (hasExported.current) return;
    hasExported.current = true;

    setTimeout(() => {
      handleDownloadPdf();
    }, 5000);
  }, []);

  return null;
}

export default ExportButton;
