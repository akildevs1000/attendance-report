import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

function ExportButton({ dashboardRef, onExportChange }) {
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
    setTimeout(() => {
      handleDownloadPdf();
    }, 5000);
  }, []);

  return (
    <></>
    // <button
    //   data-html2canvas-ignore
    //   onClick={handleDownloadPdf}
    //   disabled={isGenerating}
    //   className={`h-12 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-all shadow-sm shadow-primary/30 active:scale-95 ${
    //     isGenerating ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
    //   }`}
    // >
    //   <span className="material-symbols-outlined text-lg">
    //     {isGenerating ? "sync" : "download"}
    //   </span>
    //   <span>{isGenerating ? "Generating..." : "Export PDF"}</span>
    // </button>
  );
}

export default ExportButton;
