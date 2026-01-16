import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * @param {string|null} employeeId
 *  - null  → merge ALL employees into ONE PDF
 *  - value → export ONLY that employee
 */
const handleDownloadPdf = async (employeeId = null) => {
  const pdf = new jsPDF("landscape", "pt", "a4");

  const selector = employeeId
    ? `.pdf-page-section[data-employee="${employeeId}"]`
    : `.pdf-page-section`;

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
  }

  const fileName = employeeId
    ? `attendance_employee_${employeeId}.pdf`
    : `monthly-attendance-report.pdf`;

  pdf.save(fileName);
};

export default handleDownloadPdf;
