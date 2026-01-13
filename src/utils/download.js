import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const handleDownloadPdf = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const pdfPages = document.querySelectorAll(".pdf-page-section");

    for (let i = 0; i < pdfPages.length; i++) {
        const canvas = await html2canvas(pdfPages[i], {
            scale: 2,
            useCORS: true,
        });

        const margin = 10;

        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
    }

    pdf.save("monthly-attendance-report.pdf");
};

export default handleDownloadPdf;
