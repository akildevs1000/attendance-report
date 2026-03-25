const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());   // allow all origins
app.use(express.json());

app.get("/pdf", async (req, res) => {
    res.send("Report PDF service is running");
});


app.post("/pdf", async (req, res) => {

    const { url } = req.body;

    const browser = await puppeteer.launch({
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 0
    });

    const pdf = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: true
    });

    await browser.close();

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=report.pdf"
    });

    res.send(pdf);
});

app.post('/generate-pdf', async (req, res) => {
    const { company_id, company_name, from_date, to_date, shift_type_id, employee_id, url } = req.body;

    if (!company_id || !employee_id) {
        return res.status(400).json({ error: "company_id and employee_id required" });
    }

    const DOWNLOAD_DIR = path.join(__dirname, 'temp_reports');
    if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

    const browser = await puppeteer.launch({
        headless: true, // ✅ important (or true)
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });

    const page = await browser.newPage();

    // Enable downloads
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: DOWNLOAD_DIR });

    const params = new URLSearchParams({
        employee_ids: employee_id,
        company_id,
        from_date,
        to_date,
        shift_type_id: shift_type_id || 0,
        company_name
    });

    const endpoint = `${url}/?${params.toString()}`;
    await page.goto(endpoint, { waitUntil: 'networkidle2', timeout: 0 });

    await page.waitForFunction(() => {
        const el = document.querySelector('#statusText');
        return el && el.innerText.includes('Ready!');
    }, { timeout: 600000 });



    // Wait for download in DOWNLOAD_DIR
    let downloadedFile;
    while (true) {
        // Only include files, ignore any folders and temporary '.crdownload' files
        const files = fs.readdirSync(DOWNLOAD_DIR)
            .filter(f => fs.statSync(path.join(DOWNLOAD_DIR, f)).isFile() && !f.endsWith('.crdownload'));

        if (files.length > 0) {
            downloadedFile = files[0]; // pick the first downloaded PDF
            break;
        }
        await new Promise(r => setTimeout(r, 1000));
    }

    await browser.close();

    // Full path to the downloaded file
    const downloadedFilePath = path.join(DOWNLOAD_DIR, downloadedFile);

    // Define company and Template4 directories
    const companyDir = path.join(DOWNLOAD_DIR, company_id.toString());
    const templateDir = path.join(companyDir, "Template4");

    // Ensure the Template4 folder exists
    if (!fs.existsSync(templateDir)) fs.mkdirSync(templateDir, { recursive: true });

    // Define final PDF filename
    const newFileName = `Attendance_Report_${from_date}_${to_date}_${employee_id}.pdf`;
    const destinationPath = path.join(templateDir, newFileName);

    // Move the PDF into Template4 folder
    if (fs.existsSync(downloadedFilePath)) {
        fs.renameSync(downloadedFilePath, destinationPath);
        return res.json({ pdf_path: destinationPath });
    } else {
        return res.status(404).json({ error: "Downloaded PDF file not found" });
    }

});


app.listen(5555, "0.0.0.0", () => {
    console.log("PDF server running on port 5555");
});
