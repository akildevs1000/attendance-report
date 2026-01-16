import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const getDate = (dateStr) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
};

const handleDownloadPdf = async (setIsExporting = null, setProgress = null, from, to) => {
  const pdf = new jsPDF("landscape", "pt", "a4");

  const selector = `.pdf-page-section`;

  const pdfPages = document.querySelectorAll(selector);

  for (let i = 0; i < pdfPages.length; i++) {
    const canvas = await html2canvas(pdfPages[i], {
      scale: 2,
      useCORS: true,
      logging: true,
      scrollY: -window.scrollY, // prevents page scroll from adding space
    });

    const margin = 10;
    const imgData = canvas.toDataURL("image/jpeg", 0.78);

    const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (i !== 0) pdf.addPage();

    pdf.addImage(
      imgData,
      "JPEG",
      margin,
      margin,
      pdfWidth,
      pdfHeight,
      undefined,
      "FAST"
    );


    // Update progress
    if (setProgress) {
      const percent = Math.round(((i + 1) / pdfPages.length) * 100);
      setProgress(percent);
    }
  }

  const fileName = `Attendance-Report-${getDate(from)}-to-${getDate(to)}.pdf`;

  pdf.save(fileName);

  setTimeout(() => {
    if (setIsExporting) setIsExporting(false); // end overlay after PDF is done
  }, 2000)

};

export default handleDownloadPdf;
