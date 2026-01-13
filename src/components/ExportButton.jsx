import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

function ExportButton({ dashboardRef, onExportChange }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    const element = dashboardRef.current;
    if (!element) return;

    setIsGenerating(true);
    if (onExportChange) onExportChange(true); // 👈 Inform App.js (Start)
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        // This helps prevent elements from shifting due to scroll
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const margin = 10; // 👈 spacing from all sides
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;

      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(
        imgData,
        "PNG",
        margin, // x
        margin, // y
        pdfWidth, // width
        pdfHeight // height
      );

      pdf.save("Employee-Performance-Report.pdf");
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsGenerating(false);
      if (onExportChange) onExportChange(false); // 👈 Inform App.js (End)
    }
  };

  return (
    <button
      data-html2canvas-ignore
      onClick={handleDownloadPdf}
      disabled={isGenerating}
      className={`h-12 flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition-all shadow-sm shadow-primary/30 active:scale-95 ${
        isGenerating ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
      }`}
    >
      <span className="material-symbols-outlined text-lg">
        {isGenerating ? "sync" : "download"}
      </span>
      <span>{isGenerating ? "Generating..." : "Export PDF"}</span>
    </button>
  );
}

export default ExportButton;
