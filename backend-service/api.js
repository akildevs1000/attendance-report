// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
  const { company_id, company_name, from_date, to_date, shift_type_id, employee_id } = req.body;

  if (!company_id || !employee_id) {
    return res.status(400).json({ error: "company_id and employee_id required" });
  }

  const DOWNLOAD_DIR = path.join(__dirname, 'temp_reports');
  if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--start-maximized',
      '--no-sandbox',
      '--disable-dev-shm-usage'
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

  const url = `http://localhost:5717/attendance-report/?${params.toString()}`;
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

  await page.waitForFunction(() => {
    const el = document.querySelector('#statusText');
    return el && el.innerText.includes('Ready!');
  }, { timeout: 600000 });

  // Wait for download
  let downloadedFile;
  while (true) {
    const files = fs.readdirSync(DOWNLOAD_DIR).filter(f => !f.endsWith('.crdownload'));
    if (files.length > 0) {
      downloadedFile = files[0];
      break;
    }
    await new Promise(r => setTimeout(r, 1000));
  }

  await browser.close();

  const newFileName = `Attendance_Report_Template4_${from_date}_${to_date}_${employee_id}.pdf`;
  const newPath = path.join(DOWNLOAD_DIR, newFileName);
  fs.renameSync(path.join(DOWNLOAD_DIR, downloadedFile), newPath);

  return res.json({ pdf_path: newPath });
});

app.listen(5000, () => console.log("Node PDF service running on port 5000"));